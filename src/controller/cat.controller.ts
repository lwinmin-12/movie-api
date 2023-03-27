import {Request ,Response , NextFunction} from 'express'
import { addCat, deleteCat, getCat } from '../service/cat.service'
import fMsg from '../utils/helper'

export const getCatHandler = async (req : Request , res : Response , next : NextFunction) =>{

   try{
    let result = await getCat(req.query)
    fMsg(res , "Cat are here" , result)
   }catch(e){
        next(new Error (e))
   }
}

export const addCatHandler = async (req : Request , res : Response , next : NextFunction ) =>{
    
    try {
       let result = await addCat(req.body)
        fMsg(res , "New Cat was added" , result)
    }catch(e){
        next(new Error (e))
    }

}

export const deletCatHandler = async (req : Request , res : Response , next : NextFunction ) =>{

    try {
        await deleteCat(req.query);
        fMsg(res , "Cat was deleted");
    }catch(e){
        next(new Error (e))
    }

}