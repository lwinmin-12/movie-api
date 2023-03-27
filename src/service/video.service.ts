import { FilterQuery, UpdateQuery } from 'mongoose'
import videoModel , {videoDocument} from '../model/video.model'
import {catDocument} from "../model/cat.model"
import { delImg } from '../utils/gallary'
export const getVideo = async (query :FilterQuery<videoDocument> ) =>{

    try{
       return await videoModel.find(query).lean().populate('cat tag image').select("-__v")
    }catch(e){
        throw new Error (e) 
    }
           
}

export const addVideo = async (body : videoDocument ) =>{

    try{
      return await new videoModel(body).save()
    }catch(e){
        throw new Error (e) 
    }

}

export const updateVideo = async (query : FilterQuery<videoDocument> , body : UpdateQuery<videoDocument>) =>{
    try{
         await videoModel.updateMany(query , body)
        return await videoModel.find(query).lean()
       }catch(e){
        throw new Error(e);
       }
 }


export const deleteVideo = async (query :FilterQuery<videoDocument> ) =>{

    try{
        let video = await videoModel.find(query)
        if(!video){
            throw new Error('No video with that id')
        }
        video.map(async (ea : any) =>{
            await delImg(ea.video)
        })
       return await videoModel.deleteMany(query)
    }catch(e){
        throw new Error (e)
    }
}

export const videoAddCat = async (VideoId : FilterQuery<videoDocument> ,  catId : catDocument["_id"]) =>{
    try{
        await videoModel.findByIdAndUpdate(VideoId , {$push : {cat :  catId}})
        return await videoModel.findById(VideoId)
    }catch(e) {
        throw new Error (e)
    }
}

export const videoRemoveCat = async (query : FilterQuery<videoDocument> , catId : catDocument["_id"])=>{
    try{
        await videoModel.findByIdAndUpdate(query , {$pull :{cat : catId}})
        return await videoModel.findById(query)
    }catch(e) {
        throw new Error (e)
    }
}