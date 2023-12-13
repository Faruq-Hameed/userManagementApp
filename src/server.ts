import express from 'express';
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

app.use('/user', (req, res) => {
    res.status(200).send(`Welcome`)
})


app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
