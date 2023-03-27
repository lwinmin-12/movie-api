import {Request ,Response , NextFunction} from 'express'
import { getCat } from '../service/cat.service'
import { addVideo, deleteVideo, getVideo, updateVideo, videoAddCat, videoRemoveCat } from '../service/video.service'
import fMsg from '../utils/helper'

export const getVideoHandler = async (req : Request , res : Response , next : NextFunction) =>{

    try{
     let result = await getVideo(req.query)
     fMsg(res , "Video are here" , result)
    }catch(e){
         next(new Error (e))
    }
 }
 
 export const addVideoHandler = async (req : Request , res : Response , next : NextFunction ) =>{
     
     try {
        let result = await addVideo(req.body)
         fMsg(res , "New Video was added" , result)
     }catch(e){
         next(new Error (e))
     }
 
 }

 export const updateVideoHandler = async (req  : Request , res : Response , next : NextFunction) =>{
    
    try {
        let result = await updateVideo(req.query , req.body)
        fMsg(res , "updated video data" , result)
    }catch(e) {
        next(new Error (e))
    }
}
 
 export const deleteVideoHandler = async (req : Request , res : Response , next : NextFunction ) =>{
 
     try {
         await deleteVideo(req.query);
         fMsg(res , "Video was deleted");
     }catch(e){
         next(new Error (e))
     }
 
 }
 
 export const videoAddCatHandler = async (req : Request , res : Response , next : NextFunction )=>{
     try {
         let video = await getVideo({_id : req.body.videoId })
         let cat = await getCat({_id : req.body.catId })
        //  console.log(videoId )
         if(!video[0] || !cat[0]){
             next(new Error ("Video or Cat not found"))
         }
         let foundVideo = video[0].cat.find((ea : any) => ea._id ==  req.body.catId) 
         if(foundVideo){
             return next( new Error("Cat already in exist"))
           }
        let result = await videoAddCat(req.body.videoId , req.body.catId)
        fMsg(res , "Cat added " , result)
     // console.log(result)
     }catch(e){
         next(new Error (e))
     }
 }
 
 export const videoRemoveCatHandler = async (req : Request , res : Response , next : NextFunction ) => {
     try{
         let video = await getVideo({_id : req.body.videoId})
         // let Cat = await getCat({_id : req.body.CatId })
         let dbCat = video[0]['cat'].find((ea : any) =>  ea._id == req.body.catId)

         if(!video || !dbCat){
             throw new Error("Video or Cat not found")
         }
         console.log(dbCat)

        let result = await videoRemoveCat(req.body.videoId  , req.body.catId)
        fMsg(res , "Cat removed " , result)
     }catch(e) {
         next(new Error (e))
     }
 }