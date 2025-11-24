import express from "express";
import categoryRoutes from "./routes/category.routes.ts";
import authRoutes from "./routes/auth.routes.ts";

// Define Express App & Set ports
const app = express();
const port = process.env.PORT || 3000;

// Parses JSON request bodies
app.use(express.json());
// Parses URL-encoded from data
// extended: true means that it supports nested objects
app.use(express.urlencoded({ extended: true }));

// To be able to have my APIs in separate files
app.use("/category", categoryRoutes);
app.use("/auth", authRoutes);

// Check if Server is running
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
