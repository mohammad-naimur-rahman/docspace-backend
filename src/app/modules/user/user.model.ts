import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'

const userSchema = new Schema<IUser, UserModel>(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
)

export const User = model<IUser, UserModel>('User', userSchema)
