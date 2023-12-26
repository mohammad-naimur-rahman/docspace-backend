import { Model } from 'mongoose'

export interface IUser {
  _id: string
  fullName: string
  email: string
  role: string
}

export type UserModel = Model<IUser, Record<string, unknown>>
