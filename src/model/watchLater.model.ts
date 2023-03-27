import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface watchLaterInput {
    userId : string,
    watchLater : [] //need to change
}

export interface watchLaterDocument extends watchLaterInput,mongoose.Document{
    createdAt: Date;
    updatedAt: Date;
}

const watchLaterSchema = new Schema({
    userId : {type : String , required : true },
    watchLater :[{type : Schema.Types.ObjectId , ref : "video"}],
}, {
    timestamps: true,
})


const watchLaterModel = mongoose.model<watchLaterDocument>("serie" , watchLaterSchema)
export default watchLaterModel