import express from "express";
import db from "../models/index.models.js";
import authToken from "../Middleware/auth.js";

const Queries = db.Queries;
const router = express.Router();

router.get("/", authToken, async (req, res) => {
  try {
    const listOfQueries = await Queries.findAll({
      where: { userId: req.user.id },
    });
    res.json({ listOfQueries });
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", authToken, async (req, res) => {
  try {
    const { prompt, query } = req.body;
    if (!prompt || !query) {
      return res.status(400).json({ error: "prompt and query are required" });
    }

    const newQuery = await Queries.create({
      prompt,
      query,
      userId: req.user.id, // <-- take from decoded JWT
    });

    res.status(201).json(newQuery);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create query" });
  }
});

router.delete("/:id", async (req, res) => {
  const queryId = req.params.id;
  console.log(queryId);
  await Queries.destroy({ where: { id: queryId } });
  res.json("Query Successfully Deleted");
});
export default router;
