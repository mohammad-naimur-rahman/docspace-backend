import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import { startSession } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { IFolder } from './folder.interface'
import { Folder } from './folder.model'

const createFolder = async (
  payload: IFolder,
  user: JwtPayload
): Promise<IFolder> => {
  const session = await startSession()
  session.startTransaction()
  try {
    const { parentFolder } = payload
    let parentFolderId

    if (parentFolder === 'root') {
      let rootFolder = await Folder.findOne({
        title: 'root',
        owner: user.userId
      }).session(session)

      if (!rootFolder) {
        const newFolder = await Folder.create(
          [
            {
              title: 'root',
              owner: user.userId
            }
          ],
          { session }
        )
        rootFolder = newFolder[0]
      }

      parentFolderId = rootFolder?._id
    } else {
      parentFolderId = parentFolder
    }

    const createdFolder = await Folder.create(
      [
        {
          ...payload,
          parentFolder: parentFolderId,
          owner: user.userId
        }
      ],
      { session }
    )

    await Folder.findByIdAndUpdate(parentFolderId, {
      $push: { subFolders: createdFolder[0]._id }
    }).session(session)

    await session.commitTransaction()
    session.endSession()

    return createdFolder[0]
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}

const getFolder = async (
  id: string,
  user: JwtPayload
): Promise<IFolder | null> => {
  if (id === 'root') {
    const rootFolder = await Folder.findOne({
      title: 'root',
      owner: user.userId
    })
      .populate('subFolders')
      .populate('files')
    return rootFolder
  } else {
    const folder = await Folder.findOne({ _id: id, owner: user.userId })
      .populate('subFolders')
      .populate('files')
    return folder
  }
}

const updateFolder = async (
  id: string,
  payload: Partial<IFolder>,
  user: JwtPayload
): Promise<IFolder | null> => {
  if (id === 'root') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot update root folder!')
  }

  const updatedFolder = await Folder.findOneAndUpdate(
    { _id: id, owner: user.userId },
    payload,
    {
      runValidators: true,
      new: true
    }
  )

  if (!updatedFolder)
    throw new ApiError(httpStatus.NOT_FOUND, 'Folder not found!')

  return updatedFolder
}

const deleteFolder = async (
  id: string,
  user: JwtPayload
): Promise<IFolder | null> => {
  const session = await startSession()
  session.startTransaction()

  try {
    if (id === 'root') {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot delete root folder!')
    }

    const deletedFolder = await Folder.findOneAndDelete(
      {
        _id: id,
        owner: user.userId
      },
      { session }
    )

    if (!deletedFolder)
      throw new ApiError(httpStatus.NOT_FOUND, 'Folder not found!')

    const parentFolderId = deletedFolder?.parentFolder
    if (parentFolderId) {
      await Folder.findByIdAndUpdate(
        parentFolderId,
        {
          $pull: { subFolders: deletedFolder?._id }
        },
        { session }
      )
    }

    await session.commitTransaction()
    session.endSession()

    return deletedFolder
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}

export const FolderService = {
  createFolder,
  getFolder,
  updateFolder,
  deleteFolder
}
