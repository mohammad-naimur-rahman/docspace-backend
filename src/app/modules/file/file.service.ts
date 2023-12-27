import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IFile } from './file.interface'
import { File } from './file.model'

const createFile = async (payload: IFile): Promise<IFile> => {
  const createdFile = File.create(payload)
  return createdFile
}

const getFile = async (id: string): Promise<IFile | null> => {
  const file = await File.findById(id)
  return file
}

const updateFile = async (
  id: string,
  payload: Partial<IFile>
): Promise<IFile | null> => {
  const updatedFile = await File.findByIdAndUpdate(id, payload, {
    runValidators: true,
    new: true
  })

  if (!updatedFile) throw new ApiError(httpStatus.NOT_FOUND, 'File not found!')

  return updatedFile
}

const deleteFile = async (
  id: string,
  payload: Partial<IFile>
): Promise<IFile | null> => {
  const deletedFile = await File.findByIdAndDelete(id, payload)

  if (!deletedFile) throw new ApiError(httpStatus.NOT_FOUND, 'File not found!')

  return deletedFile
}

export const FileService = {
  createFile,
  getFile,
  updateFile,
  deleteFile
}
