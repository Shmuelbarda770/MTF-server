import { Request, Response } from 'express';
import { createApiResponse, ApiResponse } from '../util/ApiResponse';
import { connect, close } from '../util/Mongo';
import mongoose from 'mongoose';
import User ,{IUser} from '../models/userModel';
import { validateName, validateGmail, validateRole, validatePhoneNumber } from '../util/validate';

export const createUser: any = async (req: Request, res: Response) => {
    const userData = req.body;
    console.log(userData)
    
    console.log('1');
    try {
        await connect();
        const existingUser = await User.findOne({ email: userData.email });

        if (existingUser!==null) {
            return res.status(400).json(createApiResponse(false, null, "User already exists."));
        }
        const user = new User(userData);
        await user.save();

        const response: ApiResponse = createApiResponse(true, user, "User created successfully.");
        res.status(201).json(response);
        
    } catch (error: any) {
        console.log(error);
        const response: ApiResponse = createApiResponse(false, null, "User creation failed", null, error.message);
        res.status(500).json(response);
    } finally {
        await close();
    }
};

// עדכון משתמש קיים
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    const updateData = req.body;

    const errors: string[] = [];

  
    if (updateData.name && !validateName(updateData.name)) {
        errors.push('Invalid name');
    }

    if (updateData.email && !validateGmail(updateData.email)) {
        errors.push('Invalid Gmail address');
    }

    const validRoles: any = ['Admin', 'Viewer', 'Editor'];
    if (updateData.role && !validateRole(updateData.role, validRoles)) {
        errors.push('Invalid role');
    }

    if (updateData.phoneNumber && !validatePhoneNumber(updateData.phoneNumber)) {
        errors.push('Invalid phone number');
    }

    if (errors.length > 0) {
        res.status(400).json({ message: 'Validation failed', errors });
        return;
    }

    try {

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }


        res.status(200).json(updatedUser);
    } catch (error: any) {
        console.error('Error during user update:', error.message);
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// <!> This is a function designed to search for an ID from the given parameter. 
// It's important to note that this ID belongs to MongoDB and not to the individual themselves. <!>
export const getSingleUser: any = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        await connect();
        // Validate that userId is a valid MongoDB ObjectId
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json(createApiResponse(false, null, "Invalid user ID format."));
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json(createApiResponse(false, null, "User not found."));
        }

        const response: ApiResponse = createApiResponse(true, user, "User retrieved successfully.");
        res.status(200).json(response);
    } catch (error: any) {
        console.error("Error fetching user:", error);
        const response: ApiResponse = createApiResponse(false, null, "Failed to retrieve user.", null, error.message);
        res.status(500).json(response);
       
    }finally {
        await close(); 
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        await connect();
        const users = await User.find();
        if (users.length > 0) {
            const response: ApiResponse = createApiResponse(true, users, "get all users from db", null, null);
            res.status(200).json(response);
        } else {
            const response: ApiResponse = createApiResponse(true, users, "get all users from db failed no have users", null, null);
            res.status(400).json(response);
        }


    } catch (error: any) {
        console.log(error);
        const response: ApiResponse = createApiResponse(false, null, "get all users from db failed", null, error.message);
        res.status(500).json(response);
    } 
};

export const searchInput = async (req: Request, res: Response) => {
    const { searchUsers } = req.body;

    try {
        await connect();
        if (!searchUsers) {
            res.status(400).json(createApiResponse(false, null, "Search term is required", null, null));
        }

        let users;

        if (searchUsers.trim() === '') {
            users = await User.find();
        } else if (searchUsers.length > 1) {
            users = await User.find({ username: { $regex: searchUsers, $options: 'i' } });
        } else {
            users = await User.find({ username: searchUsers });
        }

        const response: ApiResponse = createApiResponse(true, users, "Search results", null, null);
        res.status(200).json(response);

    } catch (error: any) {
        console.error(error);
        const response: ApiResponse = createApiResponse(false, null, "Failed to retrieve users", null, error.message);
        res.status(500).json(response);
    } finally {
        await close();
    }
};

export const deleteUser: any = async (req: Request, res: Response) => {

    const { email } = req.body;
    try {
        await connect();
        const user = await User.findOne({ email : email })
        if (!user) {
            return res.status(404).json(createApiResponse(false, null, "User not found", null, null));
        }
        await User.deleteOne({ email })
        const response: ApiResponse = createApiResponse(true, { email }, "User deleted");
        res.status(200).json(response);

    } catch (error: any) {
        const response: ApiResponse = createApiResponse(false, null, "user not deleted", null, error.message);
        res.status(500).json(response);

    } finally {
        await close();
    }
};

export const login: any = async (req: Request, res: Response) => {
    const { Email } = req.body;

    try {
        // חיפוש משתמש במסד הנתונים
        const user: IUser | null = await User.findOne({ Email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const checkEmail = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}