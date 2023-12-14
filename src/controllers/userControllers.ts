import { Request, Response } from 'express';
import User, {User as UserType} from '../models/user';
import {createNotFoundError} from '../utils/errors';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try{
        const userData: UserType = req.body;

        const emailAlreadyExists: any = await User.findOne({email: userData.email}, "_id")
        if(emailAlreadyExists ){
            res.status(404).json({message:'email already exists'});
            return;
        }
        const usernameAlreadyExists: any = await User.findOne({username: userData.username}, "_id")
        if(usernameAlreadyExists){
            res.status(404).json({message:'username already exists'});
            return;
        }

        const newUser = await User.create(userData);
        //username will be generated automatically, 
        // also later profile pic will be added
        //user can be created with googleAuth credentials and others

        res.status(200).json({message: 'User created successfully', newUser})
    }
    catch(err){
        console.error('Error creating user:', err);
        res.status(500).json({message:'Error creating user', err})
    }
}

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {const userId: string = req.params.userId;
     const users = await User.find().sort({createdAt: -1})
     res.status(200).json({totalUsers: users.length, users});
 }
 catch (err) {
     console.error('Error all users: ',err);
     res.status(500).send('internal server error');
 }
 }

export const getUserById = async (req: Request, res: Response): Promise<void> => {
   try {const userId: string = req.params.userId;
    const user = await User.findById(userId);
    //find user by email, phonumber, names and username will be implemented later
    if (!user) {
       throw createNotFoundError('user')
    }
    res.status(200).json({message: "user found", user});
}
    catch (err: any) {
        if (err.code === 404) {
            res.status(err.code).json({ message: err.message });
        }
        else {
            console.error('Error finding user by ID: ', err);
            res.status(500).send('internal server error');
        }
    }
}

export const updateUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: string = req.params.userId;

        const emailAlreadyExists: any = await User.findOne({email: req.body.email}, "_id")
        if(emailAlreadyExists && emailAlreadyExists._id.toString() !== userId){
            res.status(404).json({message:'email already exists'});
            return;
        }
        const usernameAlreadyExists: any = await User.findOne({username: req.body.username}, "_id")
        if(usernameAlreadyExists && usernameAlreadyExists._id.toString() !== userId.toString()){
            res.status(404).json({message:`username ${req.body.username} already exists`});
            return;
        }

        const updatedData: Partial<UserType> = req.body
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData,{new: true} );
        if(!updatedUser)
        {
            res.status(404).json({message:'User not found'})
            return;
        }
        res.status(200).json({message: "user data updated successfully", updatedUser});

    }    
    catch (err) {
        console.error('Error updating user by ID: ',err);
        res.status(500).send('internal server error');
    }
    
}

export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    try{
        const userId: string = req.params.userId;
        const deletionResult = await User.deleteOne({_id: userId});
        if(deletionResult.deletedCount < 0){
            res.status(404).json({message:'User not found'})
            return;
        }
        res.status(200).send('User deleted successfully');
    }
    catch (err) {
        console.error('Error deleting user by ID: ',err);
        res.status(500).send('internal server error');
    }
}
