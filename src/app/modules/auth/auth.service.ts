import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import { envVars } from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import admin from '../../../lib/firebase'
import { User } from '../user/user.model'
import {
  IAuthUser,
  ILoginUser,
  IRefreshTokenResponse,
  ISignupUser
} from './auth.interface'

const signUpUser = async (
  authorization: string | undefined,
  payload: ISignupUser
): Promise<IAuthUser> => {
  const { email } = payload

  const token = authorization?.split(' ')[1]

  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token missing!')
  }

  const decodedValue: DecodedIdToken = await admin.auth().verifyIdToken(token)

  if (decodedValue.email !== email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid token!')
  }

  // Preventing user to set their role to admin
  const data = {
    fullName: payload.fullName,
    email: payload.email,
    role: 'user'
  }

  const isExist = await User.findOne({ email })

  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exist!')
  }

  const createdUser = await User.create(data)

  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!')
  }
  const { _id: userId, role } = createdUser

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    envVars.JWT_SECRET as Secret,
    envVars.JWT_EXPIRES_IN as string
  )

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    envVars.JWT_REFRESH_SECRET as Secret,
    envVars.JWT_REFRESH_EXPIRES_IN as string
  )

  return {
    user: createdUser,
    token: {
      accessToken,
      refreshToken
    }
  }
}

const loginUser = async (
  authorization: string | undefined,
  payload: ILoginUser
): Promise<IAuthUser | null> => {
  const { email } = payload
  const token = authorization?.split(' ')[1]

  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token missing!')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No user found with this email!')
  }

  const decodedValue: DecodedIdToken = await admin.auth().verifyIdToken(token)

  if (decodedValue.email !== email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid token!')
  }
  const { _id: userId, role } = user

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    envVars.JWT_SECRET as Secret,
    envVars.JWT_EXPIRES_IN as string
  )

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    envVars.JWT_REFRESH_SECRET as Secret,
    envVars.JWT_REFRESH_EXPIRES_IN as string
  )

  return {
    user,
    token: {
      accessToken,
      refreshToken
    }
  }
}

const newAccessToken = async (
  authorization: string
): Promise<IRefreshTokenResponse> => {
  const token = authorization?.split(' ')[1]
  // Verifying token
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      envVars.JWT_REFRESH_SECRET as Secret
    )
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }

  const { userId } = verifiedToken

  // checking if user exists
  const isUserExist = await User.findById(userId)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      userId,
      role: isUserExist.role
    },
    envVars.JWT_SECRET as Secret,
    envVars.JWT_EXPIRES_IN as string
  )

  return {
    accessToken: newAccessToken
  }
}

export const AuthService = {
  signUpUser,
  loginUser,
  newAccessToken
}
