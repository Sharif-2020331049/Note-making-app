import dotenv from 'dotenv'
import { app } from './src/app.js'
import { connectDB } from './src/config/db.js'


dotenv.config({
    
    path: "./.env"
})

connectDB()
.then(
    ()=>{
         app.listen(process.env.PORT || 8000, ()=>{
            console.log(`server is running at port ${process.env.PORT}`);
            
         })
    }
)
.catch(
    (err)=>{
     console.log('MongoDB connection failed ', err);
           
    }
)