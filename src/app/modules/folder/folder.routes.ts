import { Router } from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import authGuard from '../../middlewares/authGuard'
import validateRequest from '../../middlewares/validateRequest'
import { FolderController } from './folder.controller'
import { FolderValidation } from './folder.validatin'

const router = Router()

router.use(authGuard(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN))

router
  .route('/:id')
  .get(FolderController.getFolder)
  .post(
    validateRequest(FolderValidation.createFolderZSchema),
    FolderController.createFolder
  )
  .patch(
    validateRequest(FolderValidation.updateFolderZSchema),
    FolderController.updateFolder
  )
  .delete(FolderController.deleteFolder)

export const folderRoutes = router
