var mongoose=require('mongoose');
const uri = "mongodb+srv://anujmaha:aSmaug2022@clustertemp.vgofpu6.mongodb.net/userInfo?retryWrites=true&w=majority";

var resetPassSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { collection: 'userInfo' });

async function resetPassowrd(req, res) {
    let email = req.body.userEmail;
    let NewPassword = req.body.password;
    try {
      await mongoose.connect(uri);

      const docs = await ResetPassModel.find({ email: email }).exec();
  
        if(NewPassword == docs[0].password){
            res.send('Same Password');
        }else{
            const filter = { email: email };
            const update = { password: NewPassword };
    
            let doc = await ResetPassModel.findOneAndUpdate(filter, update);

            res.send('valid');
        }

    } catch (error) {
      console.error(error);
      res.send('invalid');
    } finally {
      mongoose.connection.close();
    }
  }

const ResetPassModel = mongoose.model('ResetPass', resetPassSchema)
 
module.exports = { ResetPassModel, resetPassowrd }