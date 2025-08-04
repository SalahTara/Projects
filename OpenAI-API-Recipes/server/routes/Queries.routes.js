import express from "express" 
import db from "../models/index.models.js";

const Queries = db.Queries;
const router = express.Router();

router.get("/", async (req, res) => {
  const listOfQueries = await Queries.findAll();
  res.json({listOfQueries: listOfQueries});
});

router.post("/", async (req, res) => {
  const queryInfo = req.body;
  await Queries.create(queryInfo);
  res.json(queryInfo);
});

router.delete("/:id", async (req, res) => {
  const queryId = req.params.id;
  console.log(queryId)
  await Queries.destroy({where: {id: queryId}});
  res.json("Query Successfully Deleted");
})
export default router;