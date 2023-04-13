var mongoose = require('mongoose');
const uri = "mongodb+srv://anujmaha:aSmaug2022@clustertemp.vgofpu6.mongodb.net/userInfo?retryWrites=true&w=majority";

var carListingSchema = new mongoose.Schema({
    ownerName: {
        type: String,
    },
    carCompany: {
        type: String,
    },
    carModel: {
        type: String,
    },
    carType: {
        type: String,
    },
    address: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    area: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    image: {
      type: String,
      required: false,
    },
    email: {
        type: String
    },
    approved: {
        type: Boolean
    },
    carNumber: {
        type: String
    },
    price: {
        type: Number
    }
}, { collection: 'OwnerCarDetails' });

async function CarListingForm(req, res) {
    let ownerName = req.body.ownerName;
    let carCompany = req.body.carCompany;
    let carModel = req.body.carModel;
    let carType = req.body.carType;
    let address = req.body.address;
    let postalCode = req.body.postalCode;
    let area = req.body.area;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let image = req.body.image;
    let email = req.body.userEmail;
    let carNumber  = req.body.carNumber;
    let price = req.body.price;
    try {
        await mongoose.connect(uri);
        console.log("Fetching data from DB");
        // await CarListingModel.create({ ownerName: ownerName, carCompany: carCompany, 
        //     carModel: carModel, carType: carType, address: address, 
        //     postalCode: postalCode, area: area, startDate: startDate, endDate: endDate,
        //     email: email, approved: false});
        await CarListingModel.create({ ownerName: ownerName, carCompany: carCompany, 
            carModel: carModel, carType: carType, startDate: startDate, endDate: endDate,
            email: email, approved: false, carNumber: carNumber, price: price});
        console.log('Car listing created successfully')
        res.send('valid');
    } catch (error) {
        console.error(error);
        res.send('invalid');
    } finally {
        mongoose.connection.close();
    }
}

const CarListingModel = mongoose.model('CarListing', carListingSchema)

module.exports = { CarListingModel, CarListingForm }
