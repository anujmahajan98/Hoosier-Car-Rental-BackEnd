var mongoose=require('mongoose');
const uri = "mongodb+srv://anujmaha:aSmaug2022@clustertemp.vgofpu6.mongodb.net/userInfo?retryWrites=true&w=majority";
// const { CarListingModel } = require('./CarListingModel');
var savePaymentSchema = new mongoose.Schema({
    PaymentId: {
        type: String,
        required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ownerEmail: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    carModel: {
      type: String,
      required: true,
    },
    carType: {
      type: String,
      required: true,
    },
    carNumber: {
        type: String,
        required: true,
    },
    carCompany: {
        type: String,
        required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    paymentDate: {
        type: Date,
        required: true,
    },
}, { collection: 'Payments' });

async function savePayment(req, res) {
    let id = req.body.PaymentId;
    console.log("savePayment --> id value is",id)
    let price = req.body.price;
    console.log("savePayment --> price value is",price)
    let userEmail = req.body.userEmail;
    console.log("savePayment --> userEmail value is",userEmail)
    let ownerEmail = req.body.ownerEmail;
    let carType = req.body.carType;
    let carCompany = req.body.carCompany;
    let carModel = req.body.carModel;
    let carNumber = req.body.carNumber;
    let ownerName = req.body.ownerName;
    let paymentDate = req.body.paymentDate;
    console.log("savePayment --> paymentDate value is",paymentDate)
    console.log(typeof(paymentDate));
    try {
      await mongoose.connect(uri);
      console.log("Saving payment Info");
      await savePaymentModel.create({ PaymentId:id, price: price, userEmail: userEmail, ownerEmail:ownerEmail,
        carType:carType, carModel:carModel,carCompany:carCompany, carNumber: carNumber, ownerName:ownerName, paymentDate: paymentDate });
        // const filter = { carNumber: carNumber };

        // const update = { password: NewPassword };
        // let doc = await ResetPassModel.findOneAndUpdate(filter, update);
      } catch (error) {
      console.error(error);
    } finally {
      mongoose.connection.close();
    }
  }

const savePaymentModel = mongoose.model('Payments', savePaymentSchema)
 
module.exports = { savePaymentModel, savePayment }