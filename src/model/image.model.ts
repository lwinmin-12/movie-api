import mongoose from 'mongoose'
import { Schema } from 'mongoose'

export interface imageDocument extends mongoose.Document {
    image : string
}

const imageSchema = new Schema({
    image : {type : String , required : true , unique : true}
})

const imageModel = mongoose.model <imageDocument> ('image' , imageSchema);
export default imageModel