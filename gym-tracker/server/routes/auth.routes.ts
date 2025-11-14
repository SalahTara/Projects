import express, { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../database.ts";
import validator from "validator";
import jwt from "jsonwebtoken";

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
  const { email, password, username } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: email }, { username: username }],
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);

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

export default router;
