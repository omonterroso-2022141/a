import { Router } from 'express'
import { addComments, editComments, deleteComments } from './comments.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/addComments/:id', [validateJwt], addComments)
api.put('/editComments/:id', [validateJwt], editComments)
api.delete('/deleteComments/:id', [validateJwt], deleteComments)


export default api