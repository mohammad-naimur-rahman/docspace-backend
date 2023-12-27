import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../../../errors/ApiError'
import { IFolder } from './folder.interface'
import { Folder } from './folder.model'

const createFolder = async (
  payload: IFolder,
  user: JwtPayload
): Promise<IFolder> => {
  const createdFolder = Folder.create({ payload, owner: user.userId })
  return createdFolder
}

const getFolder = async (id: string): Promise<IFolder | null> => {
  const folder = await Folder.findById(id)
  return folder
}

const updateFolder = async (
  id: string,
  payload: Partial<IFolder>
): Promise<IFolder | null> => {
  const updatedFolder = await Folder.findByIdAndUpdate(id, payload, {
    runValidators: true,
    new: true
  })

  if (!updatedFolder)
    throw new ApiError(httpStatus.NOT_FOUND, 'Folder not found!')

  return updatedFolder
}

const deleteFolder = async (id: string): Promise<IFolder | null> => {
  const deletedFolder = await Folder.findByIdAndDelete(id)

  if (!deletedFolder)
    throw new ApiError(httpStatus.NOT_FOUND, 'Folder not found!')

  return deletedFolder
}

export const FolderService = {
  createFolder,
  getFolder,
  updateFolder,
  deleteFolder
}
