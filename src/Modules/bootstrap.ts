import { Express } from 'express';
import userRoutes from "./Users/user.routes";
export const Bootstrap = (app: Express) => {
    app.use('/api/users', userRoutes);
}