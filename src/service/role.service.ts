import { FilterQuery } from 'mongoose'
import roleModel , { roleDocument } from '../model/role.model'
import  { permitDocument } from '../model/permit.model'

export const getRole = async (query :FilterQuery<roleDocument> ) =>{

    try{
       return await roleModel.find(query).lean()
    }catch(e){
        throw new Error (e) 
    }

}

export const addRole = async (body : roleDocument ) =>{

    try{
      return await new roleModel(body).save()
    }catch(e){
        throw new Error (e) 
    }

}

export const deleteRole = async (query :FilterQuery<roleDocument> ) =>{

    try{
       return await roleModel.deleteMany(query)
    }catch(e){
        throw new Error (e)
    }
}

export const roleAddPermit = async (query : FilterQuery<roleDocument> ,  permitId : permitDocument["_id"]) =>{
    try{
        await roleModel.findOneAndUpdate(query , {$push : {permits :  permitId}})
        return roleModel.find(query)
    }catch(e) {
        throw new Error (e)
    }
}

export const roleRemovePermit = async (query : FilterQuery<roleDocument> , permitId : permitDocument["_id"])=>{
    try{
        await roleModel.findOneAndUpdate(query , {$pull :{permits : permitId}})
        return roleModel.find(query)
    }catch(e) {
        throw new Error (e)
    }
}