import express from 'express';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {dBConfig} from './models/dBConfig';
dotenv.config();
import {userRouter} from './routes/userRoutes';


const app = express();
const PORT = 3000;
dBConfig() //db connection configuration
app.use(express.json());
app.use('/users', userRouter)

app.use('/', (req :Request,  res: Response) => {
    res.status(404).send("invalid request");
})

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
