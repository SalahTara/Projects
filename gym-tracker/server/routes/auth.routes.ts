import express, { type Request, type Response } from "express";
import { JWT_SECRET } from "../constants.ts";
import bcrypt from "bcrypt";
import prisma from "../database.ts";
import validator from "validator";
import jwt from "jsonwebtoken";
import * as jose from "jose";

const router = express.Router();

router.get("/user", async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const accessToken = authHeader.split(" ")[1];
  if (!accessToken) {
    return res.status(401).json({ error: "Token missing" });
  }

  const secret = new TextEncoder().encode(JWT_SECRET);

  let payload;
  try {
    ({ payload } = await jose.jwtVerify(accessToken, secret));
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  // FIX HERE: use your own JWT fields (userId)
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) {
    return res.status(401).json({ error: "User no longer exists" });
  }

  const newToken = await new jose.SignJWT({
    userId: user.id,
    email: user.email,
    googleId: user.googleId,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setSubject(user.id.toString()) // optional
    .sign(secret);

  return res.json({
    message: "Signed in",
    accessToken: newToken,
    user,
  });
});

router.post("/sign-up", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: email }, { username: username }],
    },
  });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Username or Email already in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const createUser = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashedPassword,
    },
  });
  res.json({ message: "User created successfully", user: createUser });
});

router.post("/sign-in", async (req: Request, res: Response) => {
  const { identifier, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }
  const isMatch = await bcrypt.compare(password, user.password as string);

  if (!isMatch) {
    return res.status(401).json({ message: "Incorrect Email or Password" });
  }

  const accessToken = await new jose.SignJWT({
    userId: user.id,
    email: user.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d") // e.g. "1h"
    .setSubject(user.id.toString())
    .sign(new TextEncoder().encode(JWT_SECRET));
  return res.json({
    message: "Sign in Successful",
    user: user,
    token: accessToken,
  });
});

router.post("/google", async (req: Request, res: Response) => {
  console.log("REQ BODY RAW:", req.body);

  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: "Missing idToken" });
  }

  const googleKeys = await jose.createRemoteJWKSet(
    new URL("https://www.googleapis.com/oauth2/v3/certs")
  );

  const { payload } = await jose.jwtVerify(idToken, googleKeys, {
    issuer: "https://accounts.google.com",
    audience:
      "1025144183250-9kn4glvtg892ruolo72ap2m3v9gs4gdd.apps.googleusercontent.com",
  });

  let user = await prisma.user.findUnique({
    where: { googleId: payload.sub! },
  });

  // If not, create user
  if (!user) {
    user = await prisma.user.create({
      data: {
        googleId: payload.sub,
        email: payload.email as string,
        name: `${payload.given_name ?? ""} ${payload.family_name ?? ""}`.trim(),
        picture: (payload.picture as string) ?? null,
      },
    });
  }

  // Create your own short-lived access token
  const accessToken = await new jose.SignJWT({
    userId: user.id,
    email: user.email,
    googleId: user.googleId,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d") // e.g. "1h"
    .setSubject(user.id.toString())
    .sign(new TextEncoder().encode(JWT_SECRET));

  return res.json({
    message: "Token Created",
    accessToken: accessToken,
    user: user,
  });
});

export default router;
