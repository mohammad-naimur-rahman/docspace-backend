// import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
// import httpStatus from 'http-status'
// import { JwtPayload, Secret } from 'jsonwebtoken'
// import { IAuth, IAuthUser, IUser } from 'validation/types'
// import { envVars } from '../../../config'
// import ApiError from '../../../errors/ApiError'
// import { jwtHelpers } from '../../../helpers/jwtHelpers'
// import admin from '../../../lib/firebaseConfig'
// import { User } from '../user/user.model'
// import { IRefreshTokenResponse } from './auth.interface'
// import { TokenVersion } from './tokenVersionModule'

// const signUpUser = async (
//   authorization: string | undefined,
//   payload: IUser
// ): Promise<IAuthUser> => {
//   const { email } = payload

//   const token = authorization?.split(' ')[1]

//   if (!token) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Token missing!')
//   }

//   const decodedValue: DecodedIdToken = await admin.auth().verifyIdToken(token)

//   if (decodedValue.email !== email) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid token!')
//   }

//   // Preventing user to set their role to admin
//   const data = {
//     fullName: payload.fullName,
//     email: payload.email,
//     profilePicture: payload.profilePicture,
//     bio: payload.bio,
//   }

//   const isExist = await User.findOne({ email })

//   if (isExist) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'User already exist!')
//   }

//   const createdUser = await User.create(data)

//   if (!createdUser) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!')
//   }
//   const { _id: userId, role } = createdUser

//   const createdTokenVersion = await TokenVersion.create({
//     user: userId,
//   })

//   const accessToken = jwtHelpers.createToken(
//     { userId, role, tokenVersion: createdTokenVersion.tokenVersion },
//     envVars.JWT_SECRET as Secret,
//     envVars.JWT_EXPIRES_IN as string
//   )

//   const refreshToken = jwtHelpers.createToken(
//     { userId, role, tokenVersion: createdTokenVersion.tokenVersion },
//     envVars.JWT_REFRESH_SECRET as Secret,
//     envVars.JWT_REFRESH_EXPIRES_IN as string
//   )

//   return {
//     user: createdUser,
//     token: {
//       accessToken,
//       refreshToken,
//     },
//   }
// }

// const loginUser = async (
//   authorization: string | undefined,
//   payload: IAuth
// ): Promise<IAuthUser | null> => {
//   const { email } = payload
//   const token = authorization?.split(' ')[1]

//   if (!token) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Token missing!')
//   }

//   const user = await User.findOne({ email })

//   if (!user) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'No user found with this email!')
//   }

//   const decodedValue: DecodedIdToken = await admin.auth().verifyIdToken(token)

//   if (decodedValue.email !== email) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid token!')
//   }
//   const { _id: userId, role } = user

//   const currentTokenVersion = await TokenVersion.findOne({
//     user: userId,
//   })

//   if (!currentTokenVersion) {
//     throw new ApiError(httpStatus.BAD_REQUEST, `User probably did't sign up!`)
//   }

//   const accessToken = jwtHelpers.createToken(
//     { userId, role, tokenVersion: currentTokenVersion.tokenVersion },
//     envVars.JWT_SECRET as Secret,
//     envVars.JWT_EXPIRES_IN as string
//   )

//   const refreshToken = jwtHelpers.createToken(
//     { userId, role, tokenVersion: currentTokenVersion.tokenVersion },
//     envVars.JWT_REFRESH_SECRET as Secret,
//     envVars.JWT_REFRESH_EXPIRES_IN as string
//   )

//   return {
//     user,
//     token: {
//       accessToken,
//       refreshToken,
//     },
//   }
// }

// const logoutUser = async (user: JwtPayload) => {
//   const currentTokenVersion = await TokenVersion.findOne({
//     user: user.userId,
//   })

//   if (!currentTokenVersion) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Token Version not found!')
//   }

//   await TokenVersion.findOneAndUpdate(
//     { user: user.userId },
//     { tokenVersion: Number(+currentTokenVersion.tokenVersion + 1) },
//     { runValidators: true }
//   )

//   return null
// }

// const newAccessToken = async (
//   authorization: string
// ): Promise<IRefreshTokenResponse> => {
//   const token = authorization?.split(' ')[1]
//   // Verifying token
//   let verifiedToken = null
//   try {
//     verifiedToken = jwtHelpers.verifyToken(
//       token,
//       envVars.JWT_REFRESH_SECRET as Secret
//     )
//   } catch (err) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
//   }

//   const { userId, tokenVersion } = verifiedToken

//   // checking if user exists
//   const isUserExist = await User.findById(userId)
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
//   }

//   // generate new token
//   const newAccessToken = jwtHelpers.createToken(
//     {
//       userId,
//       role: isUserExist.role,
//       tokenVersion,
//     },
//     envVars.JWT_SECRET as Secret,
//     envVars.JWT_EXPIRES_IN as string
//   )

//   return {
//     accessToken: newAccessToken,
//   }
// }

// export const AuthService = {
//   signUpUser,
//   loginUser,
//   logoutUser,
//   newAccessToken,
// }
