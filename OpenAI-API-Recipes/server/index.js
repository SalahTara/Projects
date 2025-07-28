import express from "express";
import cors from "cors";
import generate from "./OpenAI/generate.js";
import dotenv from "dotenv";
import db from "./models/index.models.js"
import queriesRouter from "./routes/Queries.routes.js";

const app = express();
app.use(cors());
app.use(express.json()); 
dotenv.config();

const port = process.env.PORT || 3005;

app.post("/generate", async (req, res) => {
  try {
    const { queryDescription } = req.body
    const sqlQuery = await generate(queryDescription);
    res.json({ response: sqlQuery });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Routers
app.use('/queries', queriesRouter)


db.sequelize.sync().then(() => {
	app.get("/", (req, res) => {
  		res.send("API is working ✅");
	});
	app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
  });
})
.catch((err) => {
	console.log(err)
});