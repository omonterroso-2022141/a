import { Router } from 'express'
import { addCategory, deleteCategory, updateCategory } from './category.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const app = Router()

app.post('/addCategory', [validateJwt], addCategory)
app.put('/updateCategory/:id', [validateJwt], updateCategory)
app.delete('/deleteCategory/:id', [validateJwt], deleteCategory)

export default app