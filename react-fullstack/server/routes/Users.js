const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
// const bcrypt = require("bcryptjs");
const { validateToken } = require("../middleware/AuthMiddleware");
const { sign } = require("jsonwebtoken");
const { where } = require("sequelize");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) return res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) {
      return res.json({ error: "Wrong Username And Password Combination" })
    };

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    return res.json({ token: accessToken, username: username, id: user.id });
  });
});


router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id
  const basicInfo = await Users.findByPk(id, {attributes: {exclude: ["password"]}})

  res.json(basicInfo)
})

router.put ("/changepassword", validateToken, async (req, res) => {
  const {oldPassword, newPassword} = req.body
  const user = await Users.findOne({ where: { username: req.user.username } });

  bcrypt.compare(oldPassword, user.password).then(async (match) => {
  if (!match) res.json({ error: "Your Old Password is Incorrect" });

  bcrypt.hash(newPassword, 10).then(async (hash) => {
    await Users.update({password: hash}, {where: {username: req.user.username}})
    res.json("SUCCESS")
    }); 
  });  
});
module.exports = router;