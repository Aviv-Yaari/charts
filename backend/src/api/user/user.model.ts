import { Schema, model, ObjectId } from 'mongoose';

export interface User {
  username: string;
  password: string;
  fullname: string;
}

const schema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 15,
    validate: /^[a-zA-Z0-9_]*$/,
  },
  password: { type: String, required: true },
  fullname: { type: String, required: true, minlength: 4, maxlength: 15 },
});

export const UserModel = model<User>('User', schema);
