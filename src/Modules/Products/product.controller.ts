import { Request, Response, NextFunction } from "express";
import { ProductModel } from "../../DataBase/Models/product";
import { AppError } from "../../utils/Apperror";

const addProduct = async (req: Request , res: Response, next: NextFunction) => {
    try {

        const productData = {
            ...req.body,
        };    
        const product = new ProductModel(productData);
        await product.save();

        res.status(200).json({
            Message: "Success",
            product
        });
    } catch (err) {
        return next(new AppError(`Error ${err}`, 500));
    }
};
const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allProdcuts = await ProductModel.find();
        res.status(201).json({
            "Message": "Success",
            allProdcuts
        })
    } catch (err) {
        return next(new AppError(`Error ${err}`, 500))
    }
};
const getOneProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id);
        (product) ? res.status(200).json({ "Message": "found", product }) :
            next(new AppError("Product Not Found", 404));
    } catch (err) {
        return next(new AppError(`Error ${err}`, 500));
    }
};
export default {
    getAllProducts,
    getOneProduct,
    addProduct
}