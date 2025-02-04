import { Note } from "../models/note.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const createNote = asyncHandler( async (req, res)=>{
    const { title, content } = req.body;
    console.log('title', title);
   
    if( !title || !content){
        throw new ApiError(400, "Title or content is required")
    }

    const note = await Note.create({
        title,
        content,
        user: req.user._id
    })

    return res.status(201)
    .json(
        new ApiResponse(201, note, "Note created successfully")
    )
    
})


const getAllNote = asyncHandler ( async (req, res)=>{
   try {
     const allNotes = await Note.find({user: req.user._id})
 
     if(allNotes.length === 0){
         throw new ApiError(404, "No notes found")
     }

     return res
     .status(200)
     .json(
            new ApiResponse(200, allNotes, "All notes fetched successfully")
     )
 
   } catch (error) {
        throw new ApiError(500, "Internal server error fetching all notes")
   }
  

})

const updateNote = asyncHandler( async (req, res)=>{
    
   const { title, content } = req.body;
   const { id } = req.params;

   if (!title || !content) {
      throw new ApiError(400, "Title or Content is required")
   }

  const updatedNote = await Note.findByIdAndUpdate(
    id,
    {
      title,
      content
    }, 
    {
        new: true
    }
   )

   return res
   .status(201)
   .json(
    new ApiResponse(201, updatedNote, "Note updated successfully")
   )
})

const deleteNote = asyncHandler( async (req, res)=>{
    try {
         const { id } = req.params;
          const deletedNote = await Note.findByIdAndDelete(id);
    
          if (!deletedNote) {
            throw new ApiError(401, 'Note not found for delete')
          }
    
         return res.
          status(201)
          .json(
            new ApiResponse(201, deletedNote, "Note deleted successfully")
          )
    } catch (error) {
        throw new ApiError(500, "Internal server error deleting note")
        
    }
})

export { 
    createNote,
    getAllNote,
    updateNote,
    deleteNote
}