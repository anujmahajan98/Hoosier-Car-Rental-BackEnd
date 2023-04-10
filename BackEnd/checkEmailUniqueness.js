var mongoose=require('mongoose');
const uri = "mongodb+srv://anujmaha:aSmaug2022@clustertemp.vgofpu6.mongodb.net/userInfo?retryWrites=true&w=majority";

var checkEmailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { collection: 'userInfo' });

async function checkUnieqEmail(req, res) {
    let email = req.body.email;
    console.log(email);
    try {
      await mongoose.connect(uri);
      console.log("Fetching data from DB");
      const docs = await checkEmailModel.find({ email: email }).exec();
      console.log(docs)
      if(docs.length === 0){
        res.send('valid');
      }else{
        res.send('invalid');
      }
    } catch (error) {
      console.error(error);
      res.send('valid');
    } finally {
      mongoose.connection.close();
    }
  }

const checkEmailModel = mongoose.model('checkEmail', checkEmailSchema)
 
module.exports = { checkEmailModel, checkUnieqEmail }