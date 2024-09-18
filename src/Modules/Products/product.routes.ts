import { Router } from "express";
import productController from "./product.controller";
import { mixedFiles } from "../../Uploads/fileuploads";
const productRoutes = Router();
productRoutes.get('/', productController.getAllProducts);
productRoutes.post('/addproduct', mixedFiles([{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 8 }], 'products'), productController.addProduct);
productRoutes.get('/getoneproduct/:id', productController.getOneProduct);

export default productRoutes;