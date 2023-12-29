import { z } from 'zod'

const updateProfileZSchema = z.object({
  body: z.object({
    fullName: z.string().optional(),
    profilePicture: z.string().optional()
  })
})

export const UserValidation = { updateProfileZSchema }
