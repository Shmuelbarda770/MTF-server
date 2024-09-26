import express, { Request, Response } from 'express';
import SwaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv';
const swagger  = require('../swagger.json')

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/swagger', SwaggerUI.serve, SwaggerUI.setup(swagger));

app.get('/users', (req: Request, res: Response) => {
    const data : ApiResponse   = {
        isSuccessful:true,
        displayMessage:null,
        description:null,
        exception:null,
        timestamp:null,
        data:{}
        
    }
  res.json(data);
});  


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

