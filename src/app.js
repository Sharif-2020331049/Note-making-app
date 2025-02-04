import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())
app.use(express.static('public'))

// Import router
import userRouter from './routes/user.route.js'
app.use("/api/v1/users", userRouter)

// Import note router 
import noteRouter from './routes/note.route.js'
app.use("/api/v1/notes", noteRouter)


export {app}