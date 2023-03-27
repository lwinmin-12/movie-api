import mongoose from 'mongoose'
import { Schema } from 'mongoose'

export interface catDocument extends mongoose.Document {
    name : string
}

const catSchema = new Schema({
    name : {type : String , required : true , unique : true}
})

const catModel = mongoose.model <catDocument> ('cat' , catSchema);
export default catModel