// controller/UserController.ts
import { Request, Response } from 'express';
import { createApiResponse, ApiResponse } from '../util/ApiResponse'; // תיקון הייבוא
import { getCollection, connect, close } from '../util/Mongo';

export const createUser: any = async (req: Request, res: Response) => {
    const userData = req.body;

    const errors:any = validateUser(userData);
    if (errors.length > 0) {
        return res.status(400).json(createApiResponse(false, null, "Validation errors", null, errors));
    }
    try {
        await connect();
        const users = getCollection("users");
        const userData = req.body;
        await users.insertOne(userData);
        const response: ApiResponse = createApiResponse(true, userData, "User created");
        res.status(201).json(response);

    } catch (error:any) {
        console.log(error);
        const response: ApiResponse = createApiResponse(false, null, "User creation failed", null, error.message);
        res.status(500).json(response); 
    } finally {
        await close(); 
    }
};

const validateUser = (userData: any) => {
    const errors = [];
    if (!userData.username) {
        errors.push("Username is required");
    }
    if (!userData.email || !/\S+@\S+\.\S+/.test(userData.email)) {
        errors.push("Valid email is required");
    }
    if (!userData.password || userData.password.length < 6) {
        errors.push("Password must be at least 6 characters long");
    }
    return errors;
};