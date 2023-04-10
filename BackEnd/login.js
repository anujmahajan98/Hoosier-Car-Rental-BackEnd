var mongoose=require('mongoose');
const uri = "mongodb+srv://anujmaha:aSmaug2022@clustertemp.vgofpu6.mongodb.net/userInfo?retryWrites=true&w=majority";

var userLoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { collection: 'userInfo' });

async function getUserInfo(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    console.log(password, email);
    try {
      await mongoose.connect(uri);
      console.log("Fetching data from DB");
      const docs = await LoginModel.find({ email: email }).exec();
    //   let emailToSend = docs[0].email;
    //   let passwordToSend = docs[0].password;
    //   let secQuestToSend = docs[0].securityQuestion;
    //   let secAnswerToSend = docs[0].securityAnswer;
    //   const responseJson = { emailToSend, passwordToSend, secQuestToSend, secAnswerToSend };
    //   res.send(responseJson);
      res.send(docs)
        // if(email == docs[0].email & password == docs[0].password){
        //     res.send(docs);
        // }else{
        //     res.send('invalid');
        // }
    } catch (error) {
      console.error(error);
      res.send('invalid');
    } finally {
      mongoose.connection.close();
    }
  }

const LoginModel = mongoose.model('Login', userLoginSchema)
 
module.exports = { LoginModel, getUserInfo }