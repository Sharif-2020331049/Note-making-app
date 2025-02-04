import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = async (userId)=>{
   try {
     const user = await User.findById(userId)
 
      const accessToken = await user.generateAccessToken();
      const refreshToken = await user.generateRefreshToken();
     
      user.refreshToken = refreshToken;
 
     await user.save({validateBeforeSave: false});
 
     return {accessToken, refreshToken}
   } catch (error) {
     throw new ApiError(500, "something wrong generating access and refresh token")
   }
 
}
const registerUser = asyncHandler( async (req, res)=>{

    // backend theke info accept
    // validation all comes 
    // existing user ace kina check
    // new data entry in database
    // seclect kore response pathay dibo
    // console.log(`Request body: ${req.body}`);
    
    const { email, fullName, password} = req.body
    console.log(email);
    console.log(fullName);
    console.log(password);
    
    
    
    
    if([email, fullName, password].some((field)=> field?.trim() === '')){
        throw new ApiError(400, "All field are required")
    }

    const existingUser = await User.findOne({email})

    if(existingUser){
        throw new ApiError(409, "User already exists")
    }

   const user =  await User.create(
        {
            fullName,
            password,
            email
        }
    )

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if(!createdUser){
        throw new ApiError(500, "Something went wrong when registering new user")
    }

    return res.status(201)
    .json(
        new ApiResponse(201, createdUser, "User registered successfully")
    )

})

const loginUser = asyncHandler( async (req, res)=>{
    // body theke first data nibo
    // data filled ace kina chcek korbo
    // user exists kore kina check korbo
    // password right or wrong kina check korbo

    const {email, password} = req.body;
    // console.log('email', email);
    // console.log('password', password);
    
    if( !email || !password){
        throw new ApiError(400, "Email or password is required")
    }

    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(404, "user doesn't exists")
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    
    

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid user credentials");
    };

   const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
   
   

   const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

   const options = {
    httpOnly: true,
    secure: true
   }

  return res
  .status(201)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(201, 
        loggedInUser,
        "User loggedIn successfully"
    )
  )
})

const logoutUser = asyncHandler( async (req, res)=>{
    
})





export {
    registerUser,
     loginUser,
    
}