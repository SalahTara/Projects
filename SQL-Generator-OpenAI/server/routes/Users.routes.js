import express from "express";
import db from "../models/index.models.js";
import bcrypt from "bcrypt";

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

export default router;
