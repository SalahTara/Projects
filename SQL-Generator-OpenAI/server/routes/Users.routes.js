import express from "express";
import db from "../models/index.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authToken from "../Middleware/auth.js";

const Users = db.Users;
const router = express.Router();

// Create User
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  await bcrypt.hash(password, 10).then((hashedPassword) => {
    Users.create({
      username: username,
      password: hashedPassword,
    });
    res.json("Success");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    res.status(404).json({ error: "User Doesn't Exist" });
  }

  try {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        return res
          .status(401)
          .json({ error: "Incorrect Username or Password" });
      }

      const accessToken = jwt.sign(
        { username: user.username, id: user.id },
        process.env.ACCESS_TOKEN_SECRET
      );
      return res.json({
        token: accessToken,
        username: user.username,
        id: user.id,
      });
    });
  } catch (error) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", authToken, (req, res) => {
  res.json(req.user);
});

router.put("/changepassword", async (req, res) => {
  const { username, oldPassword, newPassword, confirmNewPassword } = req.body;

  // Basic validation
  if (!username || !oldPassword || !newPassword || !confirmNewPassword) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    return res.json({ error: "User not found." });
  }

  bcrypt.compare(oldPassword, user.password).then(async (match) => {
    if (!match) return res.json({ error: "Your Old Password is Incorrect" });
    bcrypt.hash(newPassword, 10).then(async (hash) => {
      await Users.update(
        { password: hash },
        { where: { username: user.username } }
      );
      res.json("SUCCESS");
    });
  });
});

export default router;
