import mongoose from "mongoose";
import { Schema } from "mongoose";
import { imageDocument } from "./image.model";
import { tagDocument } from "./tag.model";

export interface videoInput {
    title : string,
    video : string
    rating : string
    des : string
    tag : tagDocument['_id'] //need to change
    cat : string[] //need to change
    trailer : string
    viewer : number
    image : imageDocument // need to change
    ep : number
}

export interface videoDocument extends videoInput,mongoose.Document{
    createdAt: Date;
    updatedAt: Date;
}

const videoSchema = new Schema({
    title : {type : String , required : true },
    video : {type : String , required : true , unique : true },
    rating : {type : String , required : true ,default : 0 },
    des : {type : String , required : true },
    tag : { type: Schema.Types.ObjectId,  ref: "tag" },
    cat :[{type : Schema.Types.ObjectId , ref : "cat"}],
    trailer : {type : String , required : true , unique : true },
    viewer : {type : Number , default : 0},
    image : {type : Schema.Types.ObjectId ,  required : true , ref : 'image'},
    ep : {type : Number , default : 0}
}, {
    timestamps: true,
})

const videoModel = mongoose.model<videoDocument>("video" , videoSchema)
export default videoModel