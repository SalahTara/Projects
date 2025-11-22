import express, { type Request, type Response } from "express";
import { JWT_EXPIRATION_TIME, JWT_SECRET } from "../constants.ts";
import bcrypt from "bcrypt";
import prisma from "../database.ts";
import validator from "validator";
import jwt from "jsonwebtoken";
import * as jose from "jose";

const router = express.Router();

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

  const accessToken = jwt.sign(
    { email: user.email, username: user.username },
    process.env.JWT_SECRET!,
    // { expiresIn: "1h" }
    { algorithm: "HS256" }
  );

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

  // 1. Decode Google ID token (you already use jose)
  const userInfo = jose.decodeJwt(idToken) as any;
  console.log(userInfo);

  // 2. Strip exp (like you did before)
  const { exp, ...userInfoWithoutExp } = userInfo;

  // 3. User id (sub) from Google
  const sub = userInfo.sub as string;

  // 4. Current timestamp in seconds
  const issuedAt = Math.floor(Date.now() / 1000);

  // 5. Create your own short-lived access token
  const accessToken = await new jose.SignJWT(userInfoWithoutExp)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(JWT_EXPIRATION_TIME)
    .setSubject(sub)
    .setIssuedAt(issuedAt)
    .sign(new TextEncoder().encode(JWT_SECRET));

  // await prisma.user.create()
  return res.json({ message: "Token Created", accessToken });
});

export default router;
