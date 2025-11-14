import express, { type Request, type Response } from "express";
import prisma from "../database.ts";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const categories = await prisma.exerciseCategory.findMany();
  res.json(categories);
});

export default router;
