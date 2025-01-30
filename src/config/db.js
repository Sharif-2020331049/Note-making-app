import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async ()=>{
   try {

    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    console.log(`MongoDB connected successfully`);
    
    
   } catch (error) {

    console.log('MongoDB connection failed !!', error);
    process.exit(1)
    
    
   }
}


export {connectDB}