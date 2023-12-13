import {Document, Schema} from "mongoose";


export interface User extends Document{
    name: string;
    phoneNumber: string;
    password: string;
    username: string;
    email: string;
    role: string;
    age: number;
    country: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value: string) => {
                // Example: Validate email format using a regular expression
                return /^\S+@\S+\.\S+$/.test(value);
            },
            message: 'Invalid email format',
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    username: { type: String, required: true, unique: true },
    role: {
        type: String,
        enum: ['admin', 'manager', 'user'],
        required: true
    },
    age: { type: Number, required: true },
    country: { type: String, required: true },
}
)