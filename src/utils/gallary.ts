const fs = require("fs");
import {Request ,Response , NextFunction} from 'express'

export const saveImage = (req : Request , res : Response , next : NextFunction )=>{
  let file : any = req.files?.file
  if(!file){
    return  new Error('you to add photo')
  }
  let fileName = new Date().valueOf() +"_"+file?.name
  file.mv(`src/upload/${fileName}`)
  req.body['image'] = fileName
  next()
}


export const delImg = async (fileName) => {
  await fs.unlinkSync(`src/upload/${fileName}`);
};

export const saveVideo = (req : Request , res : Response , next : NextFunction ) =>{
  let video : any = req.files?.video
  if(!video){
    return  new Error('you to add photo')
  }
  let videoName = new Date().valueOf() +"_"+video?.name
  video.mv(`src/upload/${videoName}`)
  req.body['video'] = videoName
  next()
}

