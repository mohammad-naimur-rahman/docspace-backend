import { Router } from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import authGuard from '../../middlewares/authGuard'
import validateRequest from '../../middlewares/validateRequest'
import { FileController } from './file.controller'
import { FileValidation } from './file.validation'

const router = Router()

router.use(authGuard(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN))

router.post(
  '/',
  validateRequest(FileValidation.createFileZSchema),
  FileController.createFile
)

router.get('/search', FileController.getFiles)

router
  .route('/:id')
  .get(FileController.getFile)
  .patch(
    validateRequest(FileValidation.updateFileZSchema),
    FileController.updateFile
  )
  .delete(FileController.deleteFile)

export const fileRoutes = router
