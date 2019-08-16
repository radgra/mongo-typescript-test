"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var productSchema = mongoose.Schema({
    name: { type: String, unique: true },
    unitsInStock: Number,
    unitsOnOrder: Number,
    price: Number,
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    discontinued: Boolean,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});
module.exports = mongoose.model('Product', productSchema);
