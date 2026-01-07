import express from "express";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";

const PORT = 3000;
const app = express();

// Parses JSON request bodies
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Sever is ruunning on port ${PORT} `);
});
