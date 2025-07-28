import express from "express" 
import db from "../models/index.models.js";

const Queries = db.Queries;
const router = express.Router();

router.get("/", async (req, res) => {
  const listOfPosts = await Queries.findAll();
  res.json({listOfPosts: listOfPosts});
});

router.post("/", async (req, res) => {
  const queryInfo = req.body;
  await Queries.create(queryInfo);
  res.json(queryInfo);
});

export default router;