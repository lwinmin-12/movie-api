import {Request ,Response , NextFunction} from 'express'
import { addImage, deleteImage, getImage } from '../service/image.service'
import fMsg from '../utils/helper'

export const getImageHandler = async (req : Request , res : Response , next : NextFunction) =>{

   try{
    let result = await getImage(req.query)
    fMsg(res , "Image are here" , result)
   }catch(e){
        next(new Error (e))
   }
}

export const addImageHandler = async (req : Request , res : Response , next : NextFunction ) =>{
    
    try {
       let result = await addImage(req.body)
        fMsg(res , "New Image was added" , result)
    }catch(e){
        next(new Error (e))
    }

}

export const deleteImageHandler = async (req : Request , res : Response , next : NextFunction ) =>{

    try {
        await deleteImage(req.query);
        fMsg(res , "Image was deleted");
    }catch(e){
        next(new Error (e))
    }

}