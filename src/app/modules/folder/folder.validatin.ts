import { z } from 'zod'

const createFolderZSchema = z.object({
  body: z.object({
    title: z.string(),
    parentFolder: z.string(),
    subFolders: z.array(z.string()).optional(),
    files: z.array(z.string()).optional(),
    owner: z.string().optional()
  })
})

const updateFolderZSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    parentFolder: z.string().optional(),
    subFolders: z.array(z.string()).optional(),
    files: z.array(z.string()).optional(),
    owner: z.string().optional()
  })
})

export const FolderValidation = {
  createFolderZSchema,
  updateFolderZSchema
}
