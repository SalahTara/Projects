import prisma from "../database.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authToken from "../Middleware/AuthToken.js";

const router = express.Router();

router.post("/create-account", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const hashedPasswprd = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username: username,
      password: hashedPasswprd,
    },
  });
  res.json(user);
});

router.post("/sign-in", authToken, async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { username: username },
    select: { id: true, username: true, password: true },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const hashedPassword = user.password;

  const isMatch = bcrypt.compare(password, hashedPassword);
  if (isMatch) {
    const accessToken = jwt.sign(
      { username: user.username, id: user.id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({ accessToken });
  } else {
    res.status(401).json("Unable to Sign In");
  }
});

export default router;
