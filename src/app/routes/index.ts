import express, { Router } from 'express'
import { authRoutes } from '../modules/auth/auth.routes'

const router = express.Router()

interface ModuleRoute {
  path: string
  routes: Router
}

const moduleRoutes: ModuleRoute[] = [
  {
    path: '/auth',
    routes: authRoutes
  }
]

moduleRoutes.forEach(route => router.use(route.path, route.routes))
export default router
