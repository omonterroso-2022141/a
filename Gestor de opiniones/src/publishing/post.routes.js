import { Router } from 'express'
import { addPost, myPosts, updateMyPost, deleteMyPost } from './post.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'


const api = Router()

api.post('/addPost', [validateJwt], addPost)
api.get('/myPosts', [validateJwt], myPosts)
api.put('/updateMyPost/:id', [validateJwt], updateMyPost)
api.delete('/deleteMyPost/:id', [validateJwt], deleteMyPost)


export default api