import mongoose from 'mongoose'
import { Schema } from 'mongoose'

export interface tagDocument extends mongoose.Document {
    name : string
}

const tagSchema = new Schema({
    name : {type : String , required : true , unique : true}
})

const tagModel = mongoose.model <tagDocument> ('tag' , tagSchema);
export default tagModel