"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var commentSchema = mongoose.Schema({
    content: String,
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
}, { timestamps: true });
exports.default = mongoose.model("Comment", commentSchema);
