import { Router } from "express";
import { jwtVerfify } from "../middlewares/auth.middleware.js";
import { createNote, deleteNote, getAllNote, updateNote } from "../controllers/note.controller.js";


const noteRouter = Router();

// create new notes
noteRouter.route('/create').post(jwtVerfify, createNote)

// get all notes
noteRouter.route('/').get(jwtVerfify, getAllNote)

// update note
noteRouter.route('/update/:id').patch(jwtVerfify, updateNote)

// delete note
noteRouter.route('/delete/:id').delete(jwtVerfify, deleteNote)


export  default noteRouter;