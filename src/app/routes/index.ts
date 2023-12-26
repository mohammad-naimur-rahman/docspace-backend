import express, { Router } from 'express'

const router = express.Router()

interface ModuleRoute {
  path: string
  routes: Router
}

const moduleRoutes: ModuleRoute[] = [
  // routes
]

moduleRoutes.forEach(route => router.use(route.path, route.routes))
export default router
