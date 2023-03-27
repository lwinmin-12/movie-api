import { FilterQuery } from 'mongoose'
import tagModel , {tagDocument} from '../model/tag.model'
export const getTag = async (query :FilterQuery<tagDocument> ) =>{

    try{
       return tagModel.find(query).lean()
    }catch(e){
        throw new Error (e)
    }

}

export const addTag = async (body : tagDocument ) =>{

    try{
      return new tagModel(body).save()
    }catch(e){
        throw new Error (e)
    }

}

export const deleteTag = async (query :FilterQuery<tagDocument> ) =>{

    try{
       return tagModel.deleteMany(query)
    }catch(e){
        throw new Error (e)
    }

}