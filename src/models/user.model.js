import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        unique: true,
        required: true
    },
    refreshToken: {
        type: String
    }
})

userSchema.pre("save", async function(next){
    if(this.isModified('password')){
         this.password = await bcrypt.hash(this.password, 10);
    }

    next();
})

userSchema.methods.isPasswordCorrect = async function(password) {
   const compared = await bcrypt.compare( password, this.password )
   console.log(compared);
   return compared;
   
}

userSchema.methods.generateAccessToken= function(){
    const token  = jwt.sign(
        //payload
        {
          _id: this._id,
          email: this.email,
          fullName: this.fullName,
          password: this.password
        },
      // secret key
         process.env.ACCESS_TOKEN_SECRET,
      // expiries
        {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
       )

       return token;
}

userSchema.methods.generateRefreshToken = function(){
    const refreshToken = jwt.sign(
        // payload
        {
          _id: this._id
        },
        //secret
        process.env.REFRESH_TOKEN_SECRET,
        //expiries
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )

    return refreshToken;
}
export const User = mongoose.model("User", userSchema)