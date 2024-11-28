const e = require('express');
const mongoose=require('mongoose');
//creating schema for blood stock
//need to maintain all blood groups and their quantity in the hospital
const bloodStockSchema=new mongoose.Schema({
    hospitalId:{type:mongoose.Schema.Types.ObjectId,ref:'Hospital',required:true},
    bloodGroup:{type:String,required:true},enum:['A+','A-','B+','B-','AB+','AB-','O+','O-'],
    quantity:{type:Number,default:0}
});
//creating model for blood stock
const BloodStock=mongoose.model('BloodStock',bloodStockSchema);
module.exports=BloodStock;