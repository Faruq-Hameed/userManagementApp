import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {dBConfig} from './models/dBConfig';
dotenv.config();


const app = express();
const PORT = 3000;
dBConfig() //db connection configuration
app.use(express.json());



app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
