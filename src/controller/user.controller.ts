import {Request , Response , NextFunction} from 'express'
import {registerUser , getUser} from '../service/user.service'
import fMsg from '../utils/helper'


export const registerUserHandler = async (req  : Request , res : Response , next : NextFunction) => {
    try{
        let result =await registerUser(req.body)
        fMsg(res , "user registered" , result)
    }catch(e){
        next(new Error (e))

    }
}

export const getUserHandler = async (req  : Request , res : Response , next : NextFunction) =>{
    
    try {
        let result = await getUser(req.query)
        fMsg(res , "registered users" , result)
    }catch(e) {
        next(new Error (e))

    }
}

