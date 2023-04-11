var mongoose=require('mongoose');
const uri = "mongodb+srv://anujmaha:aSmaug2022@clustertemp.vgofpu6.mongodb.net/userInfo?retryWrites=true&w=majority";

var addNewCarSchema = new mongoose.Schema({
  ownerName: {
        type: String,
    },
    carModel: {
        type: String,
    },
    carType: {
        type: String,
    },
}, { collection: 'OwnerCarDetails' });

async function carList(req, res) {
    try {
      await mongoose.connect(uri);
      console.log("Fetching car List from DB");
      const docs = await addNewCarModel.find({}, { ownerName: 1, carModel: 1, carType: 1}).exec();
      console.log(docs)
      console.log(typeof(docs))
        res.send(docs);
    } catch (error) {
      console.error(error);
      res.send('invalid');
    } finally {
      mongoose.connection.close();
    }
  }

const addNewCarModel = mongoose.model('addNewCar', addNewCarSchema)
 
module.exports = { addNewCarModel, carList }