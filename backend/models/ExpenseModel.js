// const mongoose=require('mongoose');

// const ExpenseSchema=new mongoose.Schema({
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
//     default:"expense"
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

// module.exports=mongoose.model('Expense',ExpenseSchema)

// models/ExpenseModel.js
const mongoose = require('mongoose');

// Define the Expense Schema
const expenseSchema = new mongoose.Schema(
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
      default:"expense"
    },
    username: {
      type: String, // Username to filter the expense by user
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create and export the Expense model
const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
