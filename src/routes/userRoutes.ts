import express from 'express';
import {createUser, getUserById, updateUserById, deleteUserById} from '../controllers/userControllers';

export const userRouter = express.Router();

userRouter.post('/', createUser); // Route for creating a user

userRouter.get('/:userId', getUserById); // Route for

userRouter.put('/:userId', updateUserById); // Route for

userRouter.delete('/:userId', deleteUserById);