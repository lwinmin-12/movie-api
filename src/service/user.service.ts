import { FilterQuery, UpdateQuery } from "mongoose";
import { permitDocument } from "../model/permit.model";
import UserModel, { UserDocument, UserInput } from "../model/user.model";
import { compass , createToken } from "../utils/helper";
export const registerUser = async (payload : UserInput) => {
    try {
      return await UserModel.create(payload)
    }catch(e){
       throw new Error(e);
    }
}

export const loginUser = async ({email , password} : {email : string , password : string})=>{

    try {
        let user = await UserModel.findOne({email}).populate({path : "roles permits"}).select("-__v")
   
       if(!user || !compass( password , user.password)){
           throw new Error("Creditial Error")
       }
   
        let userObj : Partial<UserDocument> = user.toObject()
        userObj['token'] = createToken(userObj)
   
        delete userObj.password
       
        return userObj
   
       }catch(e){
          throw new Error(e);
       }

}

export const getUser = async (query :  FilterQuery<UserDocument>) =>{
    try{
     return await UserModel.find(query).lean().populate({path : "roles permits"}).select("-password -__v")
    }catch(e){
     throw new Error(e);
    }
 }
 
 export const deleteUser = async (query :  FilterQuery<UserDocument>) =>{
    try{
     return await UserModel.deleteMany(query)
    }catch(e){
     throw new Error(e);
    }
 }

 export const updateUser = async (query : FilterQuery<UserDocument> , body : UpdateQuery<UserDocument>) =>{
    try{
         await UserModel.updateMany(query , body)
        return await UserModel.find(query).lean()
       }catch(e){
        throw new Error(e);
       }
 }

 export const userAddRole = async (userId : UserDocument['_id'] , roleId : UserDocument['_id']) => {
    try {

      await UserModel.findByIdAndUpdate( userId ,{$push : {roles : roleId}} )
     return await UserModel.findById(userId)
    
    }catch (e : any){
     throw new Error(e)
    }
 }

 export const userRemoveRole = async (userId : UserDocument['_id'] , roleId : UserDocument['_id']) => {
   try {
    await UserModel.findByIdAndUpdate( userId ,{$pull : {roles : roleId}} )
    return await UserModel.findById(userId)
   }catch (e : any){
    throw new Error(e)
   }
}

export const userAddPermit = async (userId : UserDocument['_id'] , permitId : permitDocument['_id']) => {
   try {
    await UserModel.findByIdAndUpdate( userId ,{$push : {permits : permitId}} )
    return await UserModel.findById(userId)
   }catch (e : any){
    throw new Error(e)
   }
}

export const userRemovePermit = async (userId : UserDocument['_id'] , permitId : permitDocument['_id']) => {
   try {
    await UserModel.findByIdAndUpdate( userId ,{$pull : {permits : permitId}} )
    return await UserModel.findById(userId)
   }catch (e : any){
    throw new Error(e)
   }
}