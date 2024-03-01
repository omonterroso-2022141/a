import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'

import userRouter from '../src/user/user.routes.js'
import postRouter from '../src/publishing/post.routes.js'
import commentRouter from '../src/comments/comments.routes,.js'
import categoryRouter from '../src/category/category.routes.js'

const app = express()
config()
const port = process.env.PORT | 3600

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))


app.use('/user',userRouter)
app.use('/post',postRouter)
app.use('/comments',commentRouter)
app.use('/category',categoryRouter)

export const initServer = ()=> {
    app.listen(port)
    console.log(`Serverd HTTP running in port ${port}`)
}