// const mongoose=require('mongoose');

// const IncomeSchema=new mongoose.Schema({
//   title:{
//     type:String,
//     required:true,
//     trim: true,
//     maxLength:50
//   },
//   amount:{
//     type:Number,
//     required:true,
//     maxLength:20,
//     trim:true
//   },
//   type:{
//     type:String,
//     default:"income"
//   },
//   date:{
//     type:Date,
//     required:true,
//     trim:true
//   },
//   category:{
//     type:String,
//     required:true,
//     trim:true
//   },
//   description:{
//     type:String,
//     required:true,
//     maxLength:20,
//     trim:true
//   },
// },{timestamps:true})

// module.exports=mongoose.model('Income',IncomeSchema)
// models/IncomeModel.js
const mongoose = require('mongoose');

// Define the Income Schema
const incomeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    type:{
          type:String,
          default:"income"
        },
    username: {
      type: String, // Username to filter the income by user
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create and export the Income model
const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
