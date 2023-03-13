import { FilterQuery, UpdateQuery } from "mongoose";
import UserModel, { UserDocument, UserInput } from "../model/user.model";
import { compass } from "../utils/helper";
export const registerUser = async (payload : UserInput) => {
    try {
      return await UserModel.create(payload)
    }catch(e){
       throw new Error(e);
    }
}

export const loginUser = async ({email , password} : {email : string , password : string})=>{

    try {
        let user = await UserModel.findOne({email :  email})
   
       if(!user){
           throw new Error("Creditial Error")
       }
   
       let isValid = compass( password , user.password)
   
       if(!isValid) {
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
     return await UserModel.find(query).lean().select("-password -__v")
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