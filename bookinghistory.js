const mongoose = require('mongoose');
const uri = "mongodb+srv://anujmaha:aSmaug2022@clustertemp.vgofpu6.mongodb.net/userInfo?retryWrites=true&w=majority";
const express = require('express');
const app = express();

var BookingHistorySchema = new mongoose.Schema({
    ownerName:{
            type:String,
            required: true
    },
    userEmail:{
        type:String,
        required: true,
    },
    carType:{
        type: String,
        required: true
    },
    carCompany:{
        type: String,
        required: true
    },
    carModel:{
        type: String,
        required: true
    },
    paymentDate:{
        type: Date,
        required: true
    },
    ownerEmail:{
        type: String,
        required: true
    },
    carNumber:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    
}, { collection: 'Payments' });

async function getBookingHistory(req,res){
    let userEmail = req.body.userEmail;
    let paymentDate = req.body.paymentDate;
    console.log("this is userEmail -->",userEmail)
    try{
    
      console.log("Fetching data for booking history details");
      console.log("paymentDate is -->",paymentDate);
      
      var docs = await BookingHistory.find({ userEmail: userEmail})
      .select('ownerName ownerEmail carCompany carModel carType carNumber price PaymentId paymentDate').exec();
    
      console.log(docs);
      res.send(docs);
    }
    catch(error){
        console.log(error)
        // console.log("this is destination reached")
        res.status(404).send("Error");
    }
    finally{
        // mongoose.connection.close();
    }
};


const BookingHistory = mongoose.model('getBookingHistory', BookingHistorySchema)
 
module.exports = { BookingHistory, getBookingHistory }