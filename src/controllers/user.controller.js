import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const registerUser = asyncHandler( async (req, res)=>{

    // backend theke info accept
    // validation all comes 
    // existing user ace kina check
    // new data entry in database
    // seclect kore response pathay dibo

    const { email, fullName, password} = req.body
    console.log(email);
    
    
    if([email, fullName, password].some((field)=> field?.trim() === '')){
        throw new ApiError(400, "All field are required")
    }

    const existingUser = await User.findOne({email})

    if(existingUser){
        throw new ApiError(400, "User already exists")
    }

   const user =  await User.create(
        {
            fullName,
            email,
            password
        }
    )

    const createdUser = await User.findById(user._id).select
    ("-password -refreshToken");

    if(!createdUser){
        throw new ApiError(500, "Something went wrong when registering new user")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(201, createdUser, "User registered successfully")
    )

})





export {
    registerUser
}