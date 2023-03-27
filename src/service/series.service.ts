import { FilterQuery } from 'mongoose'
import seriesModel , {seriesDocument} from '../model/series.model'
import { videoDocument } from '../model/video.model'

export const getSeries = async (query :FilterQuery<seriesDocument> ) =>{

    try{
       return await seriesModel.find(query).lean().populate('eps').select("-__v")
    }catch(e){
        throw new Error (e) 
    }

}

export const addSeries = async (body : seriesDocument ) =>{

    try{
      return await new seriesModel(body).save()
    }catch(e){
        throw new Error (e) 
    }

}

export const deleteSeries = async (query :FilterQuery<seriesDocument> ) =>{

    try{
       return await seriesModel.deleteMany(query)
    }catch(e){
        throw new Error (e)
    }
}

export const seriesAddVideo = async (seriesId : FilterQuery<seriesDocument> ,  videoId : videoDocument["_id"]) =>{
    try{
        await seriesModel.findByIdAndUpdate(seriesId , {$push : {eps :  videoId}})
        return seriesModel.findById(seriesId)
    }catch(e) {
        throw new Error (e)
    }
}

export const seriesRemoveVideo = async (query : FilterQuery<seriesDocument> , videoId : videoDocument["_id"])=>{
    try{
        await seriesModel.findByIdAndUpdate(query , {$pull :{eps : videoId}})
        return seriesModel.findById(query)
    }catch(e) {
        throw new Error (e)
    }
}