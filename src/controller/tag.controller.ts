import {Request ,Response , NextFunction} from 'express'
import { addTag, deleteTag, getTag } from '../service/tag.service'
import fMsg from '../utils/helper'

export const getTagHandler = async (req : Request , res : Response , next : NextFunction) =>{

   try{
    let result = await getTag(req.query)
    fMsg(res , "Tag are here" , result)
   }catch(e){
        next(new Error (e))
   }
}

export const addTagHandler = async (req : Request , res : Response , next : NextFunction ) =>{
    
    try {
       let result = await addTag(req.body)
        fMsg(res , "New Tag was added" , result)
    }catch(e){
        next(new Error (e))
    }

}

export const deleteTagHandler = async (req : Request , res : Response , next : NextFunction ) =>{

    try {
        await deleteTag(req.query);
        fMsg(res , "Tag was deleted");
    }catch(e){
        next(new Error (e))
    }

}