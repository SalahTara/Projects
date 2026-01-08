import express from "express";
import axios from "axios";
import "dotenv/config";
import { OAuth2Client } from "google-auth-library";
import prisma from "../database.js";
const router = express.Router();

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "postmessage"
);

router.post("/google", async (req, res) => {
  const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens

  const idToken = tokens.id_token;
  const verified_Id = await oAuth2Client.verifyIdToken({
    idToken,
    audience: process.env.CLIENT_ID,
  });

  const payload = verified_Id.getPayload();

  if (!payload || !payload.email || !payload.sub) {
    return res.status(400).json({ message: "Invalid Google token" });
  }
  const existing_user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (existing_user) {
    if (!existing_user.googleSub) {
      const updated_user = await prisma.user.update({
        where: { email: payload.email },
        data: {
          googleSub: payload.sub,
          displayName: payload.name ?? existing_user.displayName,
          avatarUrl: payload.picture ?? existing_user.avatarUrl,
          // displayName: existing_user.displayName ?? payload.name,
          // avatarUrl: existing_user.avatarUrl ?? payload.picture,
        },
      });
      return res
        .status(200)
        .json({ message: "User Successfully Updated", user: updated_user });
    }
    return res
      .status(200)
      .json({ message: "User Successfully Signed In", user: existing_user });
  }

  const user = await prisma.user.create({
    data: {
      displayName: payload.name,
      avatarUrl: payload.picture,
      email: payload.email,
      googleSub: payload.sub,
    },
  });

  return res
    .status(201)
    .json({ message: "User Successfully Created", user: user });
});

router.post("/sign-up", async (req, res) => {
  const { email, password } = req.body;
  const firstchar = email[0];

  const existing_user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existing_user) {
    return res.status(409).json({
      message: "Account already exists. Try signing in instead.",
    });
  }

  const user = await prisma.user.create({
    data: {
      displayName: email,
      avatarUrl: `https://ui-avatars.com/api/?name=${firstchar}`,
      email: email,
      passwordHash: password,
    },
  });

  res
    .status(200)
    .json({ message: "Email User Successfully Created", user: user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user.passwordHash === password) {
    return res.status(200).json({
      message: "User Successfully Signed In",
      user: user,
    });
  }
});

router.post("/reset-password", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (oldPassword === user.passwordHash) {
    const updated_user = await prisma.user.update({
      where: { email: user.email },
      data: {
        passwordHash: newPassword,
      },
    });
    return res.json({
      message: "Password Successfully Changed",
    });
  }
  return res.status(400).json({ message: "Password change failed" });
});

export default router;
