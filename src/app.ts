import express, { Request, Response } from 'express';
import SwaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv';
const swagger  = require('../swagger.json')
import userRoutes from './routes/UserRoute'

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/swagger', SwaggerUI.serve, SwaggerUI.setup(swagger));


app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

