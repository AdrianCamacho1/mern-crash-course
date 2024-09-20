import express from "express";
//defining routes for an Express.js application, specifically routes related to product management (create, read, update, delete - CRUD operations)
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

//Creates an Express Router  it can be used in other parts of your Express application.
const router = express.Router();
// this is the root path of the router "/" in server.js
router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;