const mongoose = require('mongoose')
import {Document, model, Model, Schema} from 'mongoose';

const supplierSchema = mongoose.Schema({
    name:String,
    contactName:String,
    contactTitle:String,
    address:String,
    city:String,
    region:String,
    postalCode:String,
    country:String
})

export const Supplier =  mongoose.model('Supplier', supplierSchema)

export interface Supplier extends Document {
    name:string;
    contactName:string;
    contactTitle:string;
    address:string;
    city:string;
    region:string;
    postalCode:string;
    country:string;
}
