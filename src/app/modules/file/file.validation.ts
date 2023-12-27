import { z } from 'zod'
import { fileTypesArr } from './file.constants'

const createFileZSchema = z.object({
  body: z.object({
    title: z.string(),
    parentFolder: z.string(),
    size: z.number().max(10),
    type: z.enum([...fileTypesArr] as [string, ...string[]]),
    filePath: z.string(),
    owner: z.string()
  })
})

const updateFileZSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    parentFolder: z.string().optional(),
    size: z.number().max(10).optional(),
    type: z.enum([...fileTypesArr] as [string, ...string[]]).optional(),
    filePath: z.string().optional(),
    owner: z.string().optional()
  })
})

export const FileValidation = {
  createFileZSchema,
  updateFileZSchema
}
