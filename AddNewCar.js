var mongoose=require('mongoose');
const uri = "mongodb+srv://anujmaha:aSmaug2022@clustertemp.vgofpu6.mongodb.net/userInfo?retryWrites=true&w=majority";

var addNewCarSchema = new mongoose.Schema({
  ownerName: {
        type: String,
    },
    carCompany: {
        type: String,
    },
    carType: {
        type: String,
    },
    image: {
      type: String,
  },
}, { collection: 'OwnerCarDetails' });

async function carList(req, res) {
    try {
      await mongoose.connect(uri);
      console.log("Fetching car List from DB");
      const docs = await addNewCarModel.find({approved: false}).exec();
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



// async function handleApprove (req,res) (id) => {
//     fetch(`http://localhost:8000/approveCar/${id}`, {
//   method: 'PUT',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({})
// })
// .then(response => response.text())
// .then(data => {
//   console.log(`Car with id ${id} has been approved`);
//   // Update the carData state to remove the car that was approved
//   const docs = await addNewCarModel.findOneAndUpdate({_id: ObjectId(id)},{ap_nap: true}).exec();
//       console.log(docs)
//       console.log(typeof(docs))
//         res.send(docs);
//   setCarData(prevCarData => prevCarData.filter(car => car._id !== id));
// })
// .catch(error => {
//   console.error(error);
// });
//   };

// const handleReject = (id) => {
//     fetch(`http://localhost:8000/rejectCar/${id}`, {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({})
// })
// .then(response => response.text())
// .then(data => {
//   console.log(data);
//   // handle the response data here, such as updating the UI to reflect the rejected car
// })
// .catch(error => {
//   console.error(error);
// });
//   };

const addNewCarModel = mongoose.model('addNewCar', addNewCarSchema)
 
module.exports = { addNewCarModel, carList }
