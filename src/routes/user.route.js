import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import multer from "multer";

const upload = multer()
const router =  Router()


router.route("/register").post( upload.none() ,registerUser)
router.route("/login").post(upload.none(), loginUser)


export default router;