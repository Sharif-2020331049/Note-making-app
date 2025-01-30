import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { User } from './models/user.model.js';

const app = express();

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// Import router
import userRouter from './routes/user.route.js'
app.use("api/v1/users", userRouter)


export {app}