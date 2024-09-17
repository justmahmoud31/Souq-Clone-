import { Request, Response, NextFunction } from 'express';
import { userModel } from '../../DataBase/Models/users';
import { AppError } from '../../utils/Apperror';

const getallUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allUsers = await userModel.find();
        res.status(200).json({
            "Message": "All Users",
            allUsers
        });
    } catch (err) {
        next(new AppError(`Error ${err}`, 404));
    }
};

const addUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = new userModel({ ...req.body });
        await user.save();
        res.status(200).json({
            "Message": "User added",
            user
        });
    } catch (err) {
        next(new AppError(`Failed to add user: ${err}`, 500));
    }
};

export default {
    getallUsers,
    addUser
};
