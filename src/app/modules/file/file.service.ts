/* eslint-disable @typescript-eslint/ban-ts-comment */
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import { startSession } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { Folder } from '../folder/folder.model'
import { IFile } from './file.interface'
import { File } from './file.model'

const createFile = async (payload: IFile, user: JwtPayload): Promise<IFile> => {
  const session = await startSession()
  session.startTransaction()
  try {
    const { parentFolder } = payload
    let parentFolderId

    //@ts-ignore
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

    const createdFile = await File.create(
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
      $push: { files: createdFile[0]._id }
    }).session(session)

    await session.commitTransaction()
    session.endSession()

    return createdFile[0]
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
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

const deleteFile = async (id: string): Promise<IFile | null> => {
  const deletedFile = await File.findByIdAndDelete(id)

  if (!deletedFile) throw new ApiError(httpStatus.NOT_FOUND, 'File not found!')

  return deletedFile
}

export const FileService = {
  createFile,
  getFile,
  updateFile,
  deleteFile
}
