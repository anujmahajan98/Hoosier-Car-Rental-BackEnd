var mongoose=require('mongoose');
const uri = "mongodb+srv://anujmaha:aSmaug2022@clustertemp.vgofpu6.mongodb.net/userInfo?retryWrites=true&w=majority";

var savePaymentSchema = new mongoose.Schema({
    PaymentId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    paymentDate: {
        type: Date,
        required: true,
    },
}, { collection: 'Payments' });

async function savePayment(req, res) {
    let id = req.body.id;
    let amount = req.body.amount;
    let email = req.body.email;
    let paymentDate = req.body.paymentDate;
    console.log(typeof(paymentDate));
    try {
      await mongoose.connect(uri);
      console.log("Saving payment Info");
      await savePaymentModel.create({ PaymentId:id, amount: amount, email: email, paymentDate: paymentDate });
    } catch (error) {
      console.error(error);
    } finally {
      mongoose.connection.close();
    }
  }

const savePaymentModel = mongoose.model('Payments', savePaymentSchema)
 
module.exports = { savePaymentModel, savePayment }