import {Request ,Response , NextFunction} from 'express'
import { addSeries, deleteSeries, getSeries, seriesAddVideo, seriesRemoveVideo } from '../service/series.service'
import { getVideo } from '../service/video.service'
import fMsg from '../utils/helper'

export const getSeriesHandler = async (req : Request , res : Response , next : NextFunction) =>{

   try{
    let result = await getSeries(req.query)
    fMsg(res , "Series are here" , result)
   }catch(e){
        next(new Error (e))
   }
}

export const addSeriesHandler = async (req : Request , res : Response , next : NextFunction ) =>{
    
    try {
       let result = await addSeries(req.body)
        fMsg(res , "New Series was added" , result)
    }catch(e){
        next(new Error (e))
    }

}

export const deletSeriesHandler = async (req : Request , res : Response , next : NextFunction ) =>{

    try {
        await deleteSeries(req.query);
        fMsg(res , "Series was deleted");
    }catch(e){
        next(new Error (e))
    }

}

export const seriesAddVideoHandler = async (req : Request , res : Response , next : NextFunction )=>{
    try {
        let Series = await getSeries({_id : req.body.seriesId })
        let video = await getVideo({_id : req.body.videoId })
        if(!Series[0] || !video[0]){
            next(new Error ("Series or video not found"))
        }
        let foundSeries = Series[0].eps.find((ea : any) => ea._id ==  req.body.videoId) 
        if(foundSeries){
            return next( new Error("video already in exist"))
          }
       let result = await seriesAddVideo(req.body.seriesId , req.body.videoId)
       fMsg(res , "video added " , result)
    // console.log(result)
    }catch(e){
        next(new Error (e))
    }
}

export const seriesRemovevideoHandler = async (req : Request , res : Response , next : NextFunction ) => {
    try{
        let Series = await getSeries({_id : req.body.seriesId})
        // let video = await getvideo({_id : req.body.videoId })
        let dbvideo = Series[0].eps.find((ea : any) => ea._id ==  req.body.videoId)
        if(!Series || !dbvideo){
            throw new Error("Series or video not found")
        }
       let result = await seriesRemoveVideo(req.body.seriesId  , req.body.videoId)
       fMsg(res , "video removed " , result)
    }catch(e) {
        next(new Error (e))
    }
}