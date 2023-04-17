var mongoose=require('mongoose');
const uri = "mongodb+srv://anujmaha:aSmaug2022@clustertemp.vgofpu6.mongodb.net/userInfo?retryWrites=true&w=majority";

var rejectCarSchema = new mongoose.Schema({
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

async function rejectCar(req, res) {
    
    let _id = req.body._id;
    let carNumber = req.body.carNumber
    try {
      console.log(" uri value: ",uri)
      await mongoose.connect(uri);

    // const cd = await ApproveCarModel.find({ carNumber: carNumber }).exec();
    // console.log('object after find ',cd)
  
      const filter = { carNumber: carNumber };
    //   const update = { $set: { approved:true }};
    // const update = { ap_nap: true };
  
      let result = await RejectCarModel.deleteOne(filter);
  
      if (result) {
        res.send('Item rejected');
        console.log('Item rejected');
      } else {
        res.send('Item not found');
        console.log('Item not approved');
      }
    } catch (error) {
      console.error(error);
      res.send('Error rejecting item');
    } finally {
      mongoose.connection.close();
    }
  }

const RejectCarModel = mongoose.model('RejectCar', rejectCarSchema)
 
module.exports = { RejectCarModel, rejectCar }