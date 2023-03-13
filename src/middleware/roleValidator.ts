import { NextFunction , Response , Request } from "express";

export const roleValidator  = (role : string)=>(req : Request , res : Response , next : NextFunction)=>{
    const foundRole = req.body.user.role.find((ea : string) => ea == role)
    if(!foundRole){
        return next(new Error ('You dont have this permission'))
       }
       next()
}