import httpStatus from 'http-status'
import { RequestWithUser } from '../../../interfaces/common'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IFolder } from './folder.interface'
import { FolderService } from './folder.service'

const createFolder = catchAsync(async (req, res) => {
  const createdFolder = await FolderService.createFolder(
    req.body,
    (req as RequestWithUser).user
  )
  sendResponse<IFolder>(res, {
    statusCode: httpStatus.CREATED,
    data: createdFolder,
    message: 'Folder created successfully!'
  })
})

const getFolder = catchAsync(async (req, res) => {
  const folder = await FolderService.getFolder(
    req.params.id,
    (req as RequestWithUser).user
  )
  sendResponse<IFolder>(res, {
    statusCode: httpStatus.OK,
    data: folder,
    message: 'Folder retrieved successfully!'
  })
})

const updateFolder = catchAsync(async (req, res) => {
  const updatedFolder = await FolderService.updateFolder(
    req.params.id,
    req.body,
    (req as RequestWithUser).user
  )
  sendResponse<IFolder>(res, {
    statusCode: httpStatus.OK,
    data: updatedFolder,
    message: 'Folder updated successfully!'
  })
})

const deleteFolder = catchAsync(async (req, res) => {
  const deletedFolder = await FolderService.deleteFolder(
    req.params.id,
    (req as RequestWithUser).user
  )
  sendResponse<IFolder>(res, {
    statusCode: httpStatus.OK,
    data: deletedFolder,
    message: 'Folder deleted successfully!'
  })
})

export const FolderController = {
  createFolder,
  getFolder,
  updateFolder,
  deleteFolder
}
