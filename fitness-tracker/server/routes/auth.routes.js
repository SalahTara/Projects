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
  console.log(tokens);

  const idToken = tokens.id_token;
  const verified_Id = await oAuth2Client.verifyIdToken({
    idToken,
    audience: process.env.CLIENT_ID,
  });

  const payload = verified_Id.getPayload();
  console.log("Payload", payload);

  const existing_user = await prisma.user.findFirst({
    where: {
      providers: {
        some: { providerUserId: payload.sub },
      },
    },
  });

  if (existing_user) {
    console.log(existing_user);
    console.log("IT WORKED");
    return;
  }
  const user = await prisma.user.create({
    data: {
      displayName: payload.name,
      avatarUrl: payload.picture,
      providers: {
        create: {
          provider: "google",
          providerUserId: payload.sub,
        },
      },
    },
  });
  console.log(user);
  res.json({ payload: payload });
});

router.post("/sign-up", async (req, res) => {
  const { email, password } = req.body;
  const firstchar = email[0];
  console.log(firstchar);
  const user = await prisma.user.create({
    data: {
      displayName: email,
      avatarUrl: `https://ui-avatars.com/api/?name=${firstchar}`,
      providers: {
        create: {
          provider: "local",
          providerUserId: email,
          email: email,
          passwordHash: password,
        },
      },
    },
  });

  console.log(user);
  console.log("USER CREATED");
  res.json({ user: user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const provider = await prisma.authProvider.findUnique({
    where: {
      providerUserId: email,
    },
    include: {
      user: true,
    },
  });

  if (provider.passwordHash === password) {
    console.log(provider);
    res.json({ message: "User Signed In" });
    return;
  }
});

export default router;
