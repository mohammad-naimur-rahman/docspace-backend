import httpStatus from 'http-status'
import { envVars } from '../../../config'
import ApiError from '../../../errors/ApiError'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IAuthUser, IRefreshTokenResponse } from './auth.interface'
import { AuthService } from './auth.service'

const cookieOptions = {
  secure: envVars.NODE_ENV === 'production',
  httpOnly: true
}

const signupUser = catchAsync(async (req, res) => {
  const {
    headers: { authorization },
    body
  } = req

  const authCredentials = await AuthService.signUpUser(authorization, body)

  if (!authCredentials) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid credentials!')
  }

  const { token } = authCredentials

  res.cookie('refreshToken', token.refreshToken, cookieOptions)
  res.cookie('accessToken', token.accessToken, cookieOptions)

  sendResponse<IAuthUser>(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Signin successfull!',
    data: authCredentials
  })
})

const loginUser = catchAsync(async (req, res) => {
  const {
    headers: { authorization },
    body
  } = req

  const authCredentials = await AuthService.loginUser(authorization, body)

  if (!authCredentials) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid credentials!')
  }

  const { token } = authCredentials

  res.cookie('refreshToken', token.refreshToken, cookieOptions)
  res.cookie('accessToken', token.accessToken, cookieOptions)

  sendResponse<IAuthUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Login successfull!',
    data: authCredentials
  })
})

const newAccessToken = catchAsync(async (req, res) => {
  const newAccessToken = await AuthService.newAccessToken(
    req.headers.authorization!
  )

  res.cookie('refreshToken', req.headers.authorization!, cookieOptions)
  res.cookie('accessToken', newAccessToken.accessToken, cookieOptions)

  sendResponse<IRefreshTokenResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'New access token created successfully!',
    data: newAccessToken
  })
})

export const AuthController = {
  signupUser,
  loginUser,
  newAccessToken
}
