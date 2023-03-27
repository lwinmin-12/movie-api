import mongoose from "mongoose";
import { Schema } from "mongoose";
// import { encode , compass } from "../utils/helper";
import { encode } from "../utils/helper";
import { permitDocument } from "./permit.model";
import { roleDocument } from "./role.model";
import bcrypt from 'bcryptjs'

export interface UserInput {
    email : string
    phone : number
    name : string
    password : string
    image : string
}

export interface UserDocument extends UserInput, mongoose.Document {
    roles : roleDocument['_id'],
    permits : permitDocument['_id'],
    history : [],
    watchLater : [] ,
    createdAt: Date;
    updatedAt: Date;
}


const userSchema = new Schema ({
    email : {type : String , required : true , unique : true },
    phone : {type : Number , required : true , unique : true},
    name : {type : String , required : true } ,
    password: { type: String, required: true },
    image : {type : String , default : "../default-img/Pfp.jpg"},
    roles : [{type : Schema.Types.ObjectId ,'ref' : 'role'}],
    permits : [{type : Schema.Types.ObjectId , 'ref' : 'permit'}],
    history : [{type : Schema.Types.ObjectId , 'ref' : 'video'}],   
    watchLater : [{type : Schema.Types.ObjectId , 'ref' : 'video'}]
}, {
    timestamps: true,
})

userSchema.pre("save" , async function (next) {
    let user = this as UserDocument

    if(!user.isModified("password")){
        return next();
    }

    let hash = encode(user.password);

    user.password = hash;

    return next()
})

userSchema.methods.comparePassword = async function (
    candidatePassword: string
  ): Promise<boolean> {
    const user = this as UserDocument;
  
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
  };

const UserModel = mongoose.model<UserDocument>("user" , userSchema)

export default UserModel