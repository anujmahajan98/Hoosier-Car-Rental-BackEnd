var mongoose=require('mongoose');
const uri = "mongodb+srv://anujmaha:aSmaug2022@clustertemp.vgofpu6.mongodb.net/userInfo?retryWrites=true&w=majority";

var approveCarSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    // ownerName: {
    //     type: String,
    //     required: true,
    // },
    // carCompany: {
    //     type: String,
    //     required: true,
    // },
    // carType: {
    //     type: String,
    //     required: true,
    // },
    approved: {
        type: Boolean,
        required: true,
    },
}, { collection: 'OwnerCarDetails' });

async function approveCar(req, res) {
    
    let _id = req.body._id;
    let carNumber = req.body.carNumber
    try {
      console.log(" uri value: ",uri)
      await mongoose.connect(uri);

    // const cd = await ApproveCarModel.find({ carNumber: carNumber }).exec();
    // console.log('object after find ',cd)
  
      const filter = { carNumber: carNumber };
      const update = { $set: { approved:true }};
    // const update = { ap_nap: true };
  
      let result = await ApproveCarModel.updateOne(filter, update);
  
      if (result) {
        res.send('Item approved');
        console.log('Item approved');
      } else {
        res.send('Item not found');
        console.log('Item not approved');
      }
    } catch (error) {
      console.error(error);
      res.send('Error approving item');
    } finally {
      mongoose.connection.close();
    }
  }

const ApproveCarModel = mongoose.model('ApproveCar', approveCarSchema)
 
module.exports = { ApproveCarModel, approveCar }