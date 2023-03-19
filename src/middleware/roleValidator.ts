import { NextFunction , Response , Request } from "express";

export const roleValidator  = (role : string)=> async (req : Request , res : Response , next : NextFunction)=>{

    // console.log('here')
    let foundRole =await req.body.user[0].roles?.find((ea : any) => ea.name == role)
    if(!foundRole){
        return next(new Error ('You dont have this permission'))
       }
       next()
}