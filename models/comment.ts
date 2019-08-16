const mongoose = require('mongoose')
import {Document, model, Model, Schema} from 'mongoose';
import { Product } from './product';

const commentSchema:Schema = mongoose.Schema({
    content:String,
    product:{type:mongoose.Schema.Types.ObjectId, ref:"Product"}
}, {timestamps:true})

export interface Comment extends Document {
    content:string;
    product:string | Product
}


export default mongoose.model("Comment", commentSchema) as Model<Comment>