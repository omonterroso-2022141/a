import { Router } from 'express'
import { register, login, update } from './user.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/register', register)
api.post('/login', login)
api.put('/update', [validateJwt], update)

export default api