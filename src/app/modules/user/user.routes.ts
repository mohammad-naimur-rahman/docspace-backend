import { Router } from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import authGuard from '../../middlewares/authGuard'
import validateRequest from '../../middlewares/validateRequest'
import { UserController } from './user.controller'
import { UserValidation } from './user.validation'

const router = Router()

router
  .route('/')
  .get(
    authGuard(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
    UserController.getProfile
  )
  .patch(
    authGuard(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
    validateRequest(UserValidation.updateProfileZSchema),
    UserController.updateProfile
  )

router.get(
  '/all-users',
  authGuard(ENUM_USER_ROLE.ADMIN),
  UserController.getAllUsers
)

router.patch(
  '/make-admin/:id',
  authGuard(ENUM_USER_ROLE.ADMIN),
  UserController.makeAdmin
)

export const userRoutes = router
