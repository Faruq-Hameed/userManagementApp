import mongoose, {Document, Schema,model} from "mongoose";
import bcrypt from 'bcrypt';

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
    name: { type: String, required: [true, 'Name is required'] },
    phoneNumber: { type: String, required: [true, 'Phone number is required'] },
    password: { type: String, required: [true, 'Password is required'], minlength: [6, 'Password must be at least 6 characters'] },
    username: { type: String, required: [true, 'Username is required'], unique: true },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: (value: string) => {
          return /^\S+@\S+\.\S+$/.test(value);
        },
        message: 'Invalid email format',
      },
    },
    role: { type: String, required: [true, 'Role is required'] },
    age: { type: Number, required: [true, 'Age is required'], min: [18, 'Minimum age is 18'] },
    country: { type: String, required: [true, 'Country is required'] },
  },
{
    timestamps: true, // Add timestamps option
  }
)


// Hash password before saving
UserSchema.pre<User>('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
      return next();
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
      return next();
    } catch (error: any) {
      return next(error);
    }
  });

  export default mongoose.model<User>('User', UserSchema);



  