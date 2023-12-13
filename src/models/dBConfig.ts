import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const dBConfig = () => {
mongoose.connect(process.env.MONGODB_URI!, {

  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
}


