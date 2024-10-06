import { Request, Response } from 'express';
import { createApiResponse, ApiResponse } from '../util/ApiResponse';
import { getCollection, connect, close } from '../util/Mongo';
import mongoose from 'mongoose';
import User ,{IUser} from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateGmail } from '../util/validate';

export const createUser :any= async (req: Request, res: Response) => {
    const userData = req.body;

    try {
        await connect();
        const users = getCollection("users");
        const existingUser = await users.findOne({ email: userData.email});
        // const errors: any = validateUser(userData, existingUser);
        
        // if (errors.length > 0) {
        //     return res.status(400).json(createApiResponse(false, null, "Validation errors", null, errors));
        // }

        await users.insertOne(userData);
        const response: ApiResponse = createApiResponse(true, userData, "User created");
        res.status(201).json(response);

    } catch (error: any) {
        console.log(error);
        const response: ApiResponse = createApiResponse(false, null, "User creation failed", null, error.message);
        res.status(500).json(response); 
    } finally {
        await close(); 
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        await mongoose.connect('');
        const users = await User.find();
        if(users.length>0){
            const response: ApiResponse = createApiResponse(true, users, "get all users from db", null, null);
            res.status(200).json(response);
        }else{
            const response: ApiResponse = createApiResponse(true, users, "get all users from db failed no have users", null, null);
            res.status(400).json(response);
        }
       

    } catch (error: any) {
        console.log(error);
        const response: ApiResponse = createApiResponse(false, null, "get all users from db failed", null, error.message);
        res.status(500).json(response);
    } finally {
        await mongoose.connection.close(); 
    }
};

export const searchInput = async (req: Request, res: Response) => {
    const { searchUsers } = req.body;

    if (!searchUsers) {
        res.status(400).json(createApiResponse(false, null, "Search term is required", null, null));
    }

    let users;

    try {
        await mongoose.connect(''); 

        
        if (searchUsers.trim() === '') {
            // users = await User.find();
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
        await mongoose.connection.close(); 
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

        // יצירת טוקן
        const token = jwt.sign({ id: user.Id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });

        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};