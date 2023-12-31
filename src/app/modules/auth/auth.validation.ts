import { z } from 'zod'

const loginUserZSchema = z.object({
  body: z.object({
    email: z.string().email()
  })
})

const signupUserZSchema = z.object({
  body: z.object({
    fullName: z.string(),
    email: z.string().email(),
    profilePicture: z.string().optional()
  })
})

export const AuthValidation = {
  loginUserZSchema,
  signupUserZSchema
}
