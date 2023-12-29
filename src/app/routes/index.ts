import express, { Router } from 'express'
import { authRoutes } from '../modules/auth/auth.routes'
import { fileRoutes } from '../modules/file/file.routes'
import { folderRoutes } from '../modules/folder/folder.routes'
import { userRoutes } from '../modules/user/user.routes'

const router = express.Router()

interface ModuleRoute {
  path: string
  routes: Router
}

const moduleRoutes: ModuleRoute[] = [
  {
    path: '/auth',
    routes: authRoutes
  },
  {
    path: '/files',
    routes: fileRoutes
  },
  {
    path: '/folders',
    routes: folderRoutes
  },
  {
    path: '/users',
    routes: userRoutes
  }
]

moduleRoutes.forEach(route => router.use(route.path, route.routes))
export default router
