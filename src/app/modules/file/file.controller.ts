import httpStatus from 'http-status'
import { RequestWithUser } from '../../../interfaces/common'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IFile } from './file.interface'
import { FileService } from './file.service'

const createFile = catchAsync(async (req, res) => {
  const createdFile = await FileService.createFile(
    req.body,
    (req as RequestWithUser).user
  )
  sendResponse<IFile>(res, {
    statusCode: httpStatus.CREATED,
    data: createdFile,
    message: 'File created successfully!'
  })
})

const getFile = catchAsync(async (req, res) => {
  const file = await FileService.getFile(
    req.params.id,
    (req as RequestWithUser).user
  )
  sendResponse<IFile>(res, {
    statusCode: httpStatus.OK,
    data: file,
    message: 'File retrieved successfully!'
  })
})

const updateFile = catchAsync(async (req, res) => {
  const updatedFile = await FileService.updateFile(
    req.params.id,
    req.body,
    (req as RequestWithUser).user
  )
  sendResponse<IFile>(res, {
    statusCode: httpStatus.OK,
    data: updatedFile,
    message: 'File updated successfully!'
  })
})

const deleteFile = catchAsync(async (req, res) => {
  const deletedFile = await FileService.deleteFile(
    req.params.id,
    (req as RequestWithUser).user
  )
  sendResponse<IFile>(res, {
    statusCode: httpStatus.OK,
    data: deletedFile,
    message: 'File deleted successfully!'
  })
})

export const FileController = {
  createFile,
  getFile,
  updateFile,
  deleteFile
}
