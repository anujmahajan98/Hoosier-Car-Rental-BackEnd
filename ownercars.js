const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const uri = "mongodb+srv://anujmaha:aSmaug2022@clustertemp.vgofpu6.mongodb.net/userInfo?retryWrites=true&w=majority";
//import UserView from '../src/components/UserView/UserView';
const express = require('express');
const app = express();

var ownerCarsSchema = new mongoose.Schema({
    ownerName:{
            type:String,
            required: true
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
    startDate:{
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
    approved:{
        type: Boolean,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    image:{
        type: String,
        required: false
    },
}, { collection: 'OwnerCarDetails' });

async function getCarInfo(req,res){
    let carType = req.body.carType;
    // var startDate = new Date();
    var startDate = req.body.startDate;
    //var startDate = new Date(Date.parse(startDate));
    //var endDate = new Date(Date.parse(endDate));
    console.log(typeof(startDate));
    console.log(startDate);
    // var endDate  = new Date();
    var endDate = req.body.endDate;
    // var endDate = new Date(endDate);
    //console.log(endDate);
    // startDate = startDate;
    // endDate = endDate;
    try{
    
      console.log("Fetching data from DB");
      console.log(carType,startDate,endDate);
      
      let days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)); // Calculate the difference between startDate and endDate in days

      var docs = await OwnerCars.find({ carType: carType,startDate : {$lte:new Date(startDate)}, endDate:{$gte:new Date(endDate)}, approved:true})
      .select('ownerName carCompany carModel carType ownerEmail carNumber price image').exec();
    
    console.log(docs);
    const modifiedDocs = docs.map(doc => {
        if (days <= 1) {
          doc.price = doc.price * days; // Update the price for rentals less than or equal to 1 day
        } else {
          doc.price = doc.price * days; // Update the price for rentals greater than 1 day
        }
        return doc;
      });
      res.send(modifiedDocs);
    }
    catch(error){
        console.log(error)
        // console.log("this is destination reached")
        res.status(404).send("Error");
    }
    finally{
//         mongoose.connection.close();
    }
};

// app.get('/UserView', getCarInfo);

const OwnerCars = mongoose.model('getCarInfo', ownerCarsSchema)
 
module.exports = { OwnerCars, getCarInfo }
