import express, { Router } from 'express'
import { authRoutes } from '../modules/auth/auth.routes'
import { fileRoutes } from '../modules/file/file.routes'

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
    path: '/file',
    routes: fileRoutes
  }
]

moduleRoutes.forEach(route => router.use(route.path, route.routes))
export default router
