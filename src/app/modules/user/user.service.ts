import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'

const getProfile = async (user: JwtPayload): Promise<IUser | null> => {
  const profile = await User.findById(user.userId)

  if (!profile) throw new ApiError(httpStatus.NOT_FOUND, 'User not found!')

  return profile
}

const updateProfile = async (
  payload: Partial<IUser>,
  user: JwtPayload
): Promise<IUser | null> => {
  console.log(user.userId)
  const profile = await User.findById(user.userId)

  if (!profile) throw new ApiError(httpStatus.NOT_FOUND, 'User not found!')

  const updatedProfile = await User.findByIdAndUpdate(
    user.userId,
    {
      ...payload,
      email: profile.email, // User can't change his email because it's associated with firebase also
      role: profile.role // preventing user from making him admin
    },
    {
      new: true,
      runValidators: true
    }
  )

  console.log(updatedProfile)

  return updatedProfile
}

const getAllUsers = async (user: JwtPayload): Promise<IUser[] | null> => {
  if (user.role !== 'admin')
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not allowed to access this!'
    )

  const allUsers = await User.find()
  return allUsers
}

const makeAdmin = async (id: string): Promise<IUser | null> => {
  const updatedUser = await User.findByIdAndUpdate(id, { role: 'admin' })
  return updatedUser
}

export const UserService = {
  getProfile,
  updateProfile,
  makeAdmin,
  getAllUsers
}
