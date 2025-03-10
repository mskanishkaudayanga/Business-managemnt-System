import express from "express";
import productController from "../controllers/product.controller";
import authMiddleware from "../middleware/AuthorizationUser";

const productRoutes = express.Router();

productRoutes.put("/updateProduct",productController.updateProduct );
productRoutes.post("/AddProducts", productController.productAdd);
// productRoutes.get("/getAllProductByUser",authMiddleware, productController.getProductsByuserId);

export default productRoutes;