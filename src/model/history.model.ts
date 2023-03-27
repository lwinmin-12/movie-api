import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface historyInput {
    userId : string,
    history : [] //need to change
}

export interface historyDocument extends historyInput,mongoose.Document{
    createdAt: Date;
    updatedAt: Date;
}

const historySchema = new Schema({
    userId : {type : String , required : true },
    history :[{type : Schema.Types.ObjectId , ref : "video"}],
}, {
    timestamps: true,
})


const historyModel = mongoose.model<historyDocument>("serie" , historySchema)
export default historyModel