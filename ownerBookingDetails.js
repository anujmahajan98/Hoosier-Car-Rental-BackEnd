var mongoose = require('mongoose');
const uri = "mongodb+srv://anujmaha:aSmaug2022@clustertemp.vgofpu6.mongodb.net/userInfo?retryWrites=true&w=majority";

    const ownerBookingSchema = new mongoose.Schema({
      ownerEmail:{
            type:String,
            required: true
        }
    }, { collection: 'userPurchases' });


    async function ownerBookingDetails(req, res) {
      let ownerEmail = req.body.userEmail;
      console.log('Owner Email at backend is ' , ownerEmail)
        try {
          await mongoose.connect(uri);
          console.log("Fetching Data from user purchase");
          const docs = await ownerBookingModel.find({ ownerEmail: ownerEmail }).exec();
          console.log(docs)
          res.send(docs);
        } catch (error) {
          console.error(error);
          res.send('invalid');
        } finally {
          mongoose.connection.close();
        }
      }
    

    

    const ownerBookingModel = mongoose.model('Cars', ownerBookingSchema);
    module.exports = { ownerBookingModel, ownerBookingDetails}