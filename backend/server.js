import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

// Middleware

app.use(cors());

app.use(express.json());

// Database Connection

connectDB();

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Test Route

app.get("/", (req, res) => {
  res.send("API Running Successfully");
});

// PORT

const PORT = process.env.PORT || 8000;

// Server Start

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
