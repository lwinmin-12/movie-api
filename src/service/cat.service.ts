import { FilterQuery } from 'mongoose'
import catModel , {catDocument} from '../model/cat.model'

export const getCat = async (query :FilterQuery<catDocument> ) =>{

    try{
       return catModel.find(query).lean()
    }catch(e){
        throw new Error (e)
    }

}

export const addCat = async (body : catDocument ) =>{

    try{
      return new catModel(body).save()
    }catch(e){
        throw new Error (e)
    }

}

export const deleteCat = async (query :FilterQuery<catDocument> ) =>{

    try{
       return catModel.deleteMany(query)
    }catch(e){
        throw new Error (e)
    }

}