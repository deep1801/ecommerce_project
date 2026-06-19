import express from "express";

import {
  createProduct,
  deleteProduct,
  getDashboardStats,
  getProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

// CREATE PRODUCT

router.post("/create", createProduct);
router.get("/dashboard-stats", getDashboardStats);
router.get("/get", getProducts);
router.get("/get/:id", getSingleProduct);

router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
