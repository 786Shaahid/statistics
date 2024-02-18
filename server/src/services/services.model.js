
import mongoose from 'mongoose';

const transactionSchema= new mongoose.Schema({
       title:{
        type:String
       },
       price:{
        type:String
       },
       description:{
        type:String
       },
       category:{
        type:String
       },
       image:{
        type:String
       },
       sold:{
        type:Boolean
       },
       dateOfSale:{
        type:Date
       }
});
// Create text index on the specified fields
// transactionSchema.index({ title: 'text', description: 'text', price: 'text' });

export const Transaction=mongoose.model('Transaction',transactionSchema);