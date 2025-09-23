import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/user", userRoutes);

app.listen(3005, () => {
  console.log("App is listening on port 3005");
});
