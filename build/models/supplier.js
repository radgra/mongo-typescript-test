"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var supplierSchema = mongoose.Schema({
    name: String,
    contactName: String,
    contactTitle: String,
    address: String,
    city: String,
    region: String,
    postalCode: String,
    country: String
});
exports.Supplier = mongoose.model('Supplier', supplierSchema);
