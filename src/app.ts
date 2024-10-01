import express, { Request, Response } from 'express';
import SwaggerUI from 'swagger-ui-express';
import cors from 'cors';
// import dotenv from 'dotenv';
const swagger  = require('../swagger.json')
import userRoutes from './routes/UserRoute'

// dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api',userRoutes);
app.use('/swagger', SwaggerUI.serve, SwaggerUI.setup(swagger));




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

