import { Request, Response } from 'express';
import {createApiResponse} from '../util/ApiResponse'

import {getCollection,connect, close} from '../util/Mongo'
import { log } from 'console';

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
        
   
        const response: ApiResponse = createApiResponse(true, userData, "User created");
        res.status(201).json(response);

    }catch(error){
        console.log(error)
    }finally {
        await close(); 
    }
};
