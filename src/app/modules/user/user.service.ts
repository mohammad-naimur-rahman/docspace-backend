import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'

const getProfile = async (user: JwtPayload): Promise<IUser | null> => {
  const profile = await User.findById(user.userId)

  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!')
  }

  return profile
}

export const UserService = {
  getProfile
}
