// controller/UserController.ts
import { Request, Response } from 'express';
import { createApiResponse, ApiResponse } from '../util/ApiResponse'; // תיקון הייבוא
import { getCollection, connect, close } from '../util/Mongo';

export const createUser: any = async (req: Request, res: Response) => {
    const userData = req.body;


    try {
        await connect();
        const users = getCollection("users");

        const existingUser = await users.findOne({ email: userData.email });
        if (existingUser) {
            return res.status(400).json(createApiResponse(false, null, "User already exists", null, "User already exists"));
        }
        
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
