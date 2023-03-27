import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface seriesInput {
    title : string,
    eps : [] //need to change
    image : string
    description : string
}

export interface seriesDocument extends seriesInput,mongoose.Document{
    createdAt: Date;
    updatedAt: Date;
}

const seriesSchema = new Schema({
    title : {type : String , required : true },
    eps :[{type : Schema.Types.ObjectId , ref : "video"}],
    image : {type : Schema.Types.ObjectId , ref : "image"},
    description : {type : String }
}, {
    timestamps: true,
})


const seriesModel = mongoose.model<seriesDocument>("serie" , seriesSchema)
export default seriesModel