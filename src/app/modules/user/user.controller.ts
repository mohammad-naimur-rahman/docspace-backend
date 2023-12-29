import httpStatus from 'http-status'
import { RequestWithUser } from '../../../interfaces/common'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IUser } from './user.interface'
import { UserService } from './user.service'

const getProfile = catchAsync(async (req, res) => {
  const userProfile = await UserService.getProfile(
    (req as RequestWithUser).user
  )
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    data: userProfile,
    message: 'Profile retrieved successfully!'
  })
})

const updateProfile = catchAsync(async (req, res) => {
  const updatedProfile = await UserService.updateProfile(
    req.body,
    (req as RequestWithUser).user
  )
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    data: updatedProfile,
    message: 'Profile updated successfully!'
  })
})

const getAllUsers = catchAsync(async (req, res) => {
  const allUsers = await UserService.getAllUsers((req as RequestWithUser).user)
  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    data: allUsers,
    message: 'Retrieved all users successfully!'
  })
})

const makeAdmin = catchAsync(async (req, res) => {
  const adminProfile = await UserService.makeAdmin(req.params.id)
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    data: adminProfile,
    message: 'Admin created successfully!'
  })
})

export const UserController = {
  getProfile,
  updateProfile,
  getAllUsers,
  makeAdmin
}
