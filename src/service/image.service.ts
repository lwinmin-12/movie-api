import { FilterQuery } from 'mongoose'
import imageModel , {imageDocument} from '../model/image.model'
import { delImg } from '../utils/gallary'

export const getImage = async (query :FilterQuery<imageDocument> ) =>{

    try{
       return imageModel.find(query).lean()
    }catch(e){
        throw new Error (e)
    }

}

export const addImage = async (body : imageDocument ) =>{

    try{
      return new imageModel(body).save()
    }catch(e){
        throw new Error (e)
    }

}

export const deleteImage = async (query :FilterQuery<imageDocument> ) =>{

    try{
        let image = await imageModel.find(query)
        image.map(async (ea : any) =>{
            await delImg(ea.image)
        })
       return imageModel.deleteMany(query)
    }catch(e){
        throw new Error (e)
    }


}