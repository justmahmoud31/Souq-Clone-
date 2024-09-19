import { Router } from "express";
import productController from "./product.controller";
const productRoutes = Router();
productRoutes.get('/', productController.getAllProducts);
productRoutes.post('/addproduct',productController.addProduct);
productRoutes.get('/getoneproduct/:id', productController.getOneProduct);

export default productRoutes;