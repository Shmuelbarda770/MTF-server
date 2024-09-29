// controller/UserController.ts
import { Request, Response } from 'express';
import { createApiResponse, ApiResponse } from '../util/ApiResponse'; // תיקון הייבוא
import { getCollection, connect, close } from '../util/Mongo';

export const createUser = async (req: Request, res: Response) => {
    try {
        await connect();
        const users = getCollection("users");
        const userData = req.body;

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