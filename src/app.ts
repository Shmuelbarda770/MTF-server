import express, { Request, Response } from 'express';
import SwaggerUI from 'swagger-ui-express';
import Route from './routes/Route'
import cors from 'cors';
// import dotenv from 'dotenv';
const swagger  = require('../swagger.json')

// dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(Route);
app.use('/swagger', SwaggerUI.serve, SwaggerUI.setup(swagger));




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

