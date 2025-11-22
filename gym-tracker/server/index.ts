import express, { type Request, type Response } from "express";
import prisma from "./database.ts";
import categoryRoutes from "./routes/category.routes.ts";
import authRoutes from "./routes/auth.routes.ts";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/category", categoryRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
