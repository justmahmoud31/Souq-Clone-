import { Router } from "express";
import usersController from "./users.controller";
const userRoutes = Router();
userRoutes.get('/',usersController.getallUsers);
userRoutes.post('/adduser',usersController.addUser);

export default userRoutes;