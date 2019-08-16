const mongoose = require('mongoose')
import {Document, model, Model, Schema} from 'mongoose';
import { Comment } from './comment';
import { Supplier } from './supplier';

const productSchema:Schema = mongoose.Schema({
    name:{type:String, unique:true},
    unitsInStock:Number,
    unitsOnOrder:Number,
    price:Number,
    supplier:{type:mongoose.Schema.Types.ObjectId,ref:'Supplier'},
    discontinued:Boolean,
    comments: [{type:mongoose.Schema.Types.ObjectId, ref:"Comment"}]
})

module.exports = mongoose.model('Product', productSchema)


export interface Product extends Document {
    name:string;
    unitsInStock:number;
    unitsOnOrder:number;
    price:number;
    supplier: Supplier | string;
    discontinued:boolean;
    comments:string[] | Comment[]
}