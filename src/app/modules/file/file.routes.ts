import { Router } from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import authGuard from '../../middlewares/authGuard'
import validateRequest from '../../middlewares/validateRequest'
import { FileController } from './file.controller'
import { FileValidation } from './file.validation'

const router = Router()

router.use(authGuard(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN))

router
  .route('/:id')
  .get(FileController.getFile)
  .post(
    validateRequest(FileValidation.createFileZSchema),
    FileController.createFile
  )
  .patch(
    validateRequest(FileValidation.updateFileZSchema),
    FileController.updateFile
  )
  .delete(FileController.deleteFile)

export const fileRoutes = router
