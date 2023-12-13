import { Request, Response } from 'express';
import User, {User as UserType} from '../models/user';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try{
        const userData: UserType = req.body;
        const newUser = await User.create(userData);
        //username will be generated automatically, 
        // also later profile pic will be added
        //user can be created with googleAuth credentials and others
        //check if user already exists

        res.status(200).json({message: 'User created successfully', newUser})
    }
    catch(err){
        console.error('Error creating user:', err);
        res.status(500).json({message:'Error creating user', err})
    }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
   try {const userId: string = req.params.userId;
    const user = await User.findById(userId);
    //find user by email, phonumber, names and username will be implemented later
    if (!user) {
        res.status(404).json({message:'User not found'})
        return;
    }
    res.status(200).json({message: "user found", user});
}
catch (err) {
    console.error('Error finding user by ID: ',err);
    res.status(500).send('internal server error');
}
}

export const updateUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: string = req.params.userId;
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
        if(deletionResult.deletedCount > 0){
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
