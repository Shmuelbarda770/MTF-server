import { Request, Response } from 'express';
import { createApiResponse, ApiResponse } from '../util/ApiResponse';
import { getCollection, connect, close } from '../util/Mongo';


export const createUser:any = async (req: Request, res: Response) => {
    const userData = req.body;

    try {
        await connect();
        const users = getCollection("users");

       
        const existingUser = await users.findOne({ email: userData.email });
        const errors: any = validateUser(userData, existingUser);
        
        if (errors.length > 0) {
            return res.status(400).json(createApiResponse(false, null, "Validation errors", null, errors));
        }

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


const validateUser = (userData: any, existingUser: any) => {
    const errors = [];
    
    if (existingUser) {
        errors.push("User already exists");
    }
    if (!userData.firstName) {
        errors.push("First name is required");
    }
    if (!userData.lastName) {
        errors.push("Last name is required");
    }
    if (!userData.role) {
        errors.push("Role is required");
    }
    if (!userData.email || !/\S+@\S+\.\S+/.test(userData.email)) {
        errors.push("Valid email is required");
    }

    return errors;
};