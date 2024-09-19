import { Express } from 'express';
import userRoutes from "./Users/user.routes";
import productRoutes from './Products/product.routes';
import { mixedFiles } from '../../Uploads/fileuploads';
export const Bootstrap = (app: Express) => {
    app.use('/api/users', userRoutes);
    app.use('/api/products', productRoutes);
}