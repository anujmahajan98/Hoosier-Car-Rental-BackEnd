var mongoose=require('mongoose');
const uri = "mongodb+srv://anujmaha:aSmaug2022@clustertemp.vgofpu6.mongodb.net/userInfo?retryWrites=true&w=majority";

var userRegistrationSchema = new mongoose.Schema({
    username: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        // required: true,
    },
    role: {
        type: String,
        // required: true,
    },
    securityQuestion: {
        type: String,
        // required: true,
    },
    securityAnswer: {
        type: String,
        // required: true,
    },
    address: {
      type: String,
      // required: true,
  },
  lattitude: {
    type: Number,
    // required: true,
  },
  longitude: {
    type: Number,
    // required: true,
  }
}, { collection: 'userInfo' });

async function createUser(req, res) {
    let username = req.body.username;
    let email = req.body.email;
    console.log('Got the email and it is')
    console.log(email)
    let password = req.body.password;
    let selectedOption = req.body.selectedOption;
    let securityQuestion = req.body.selectedSecurityQuestion;
    let securityAnswer = req.body.securityAnswer;
    let address = req.body.address;
    let lattitude = req.body.lattitude;
    let longitude = req.body.longitude;
    console.log(address, lattitude, longitude);
    //console.log(username, email, password, selectedOption);
    try {
      await mongoose.connect(uri);
      console.log("Fetching data from DB");
      await RegisterModel.create({ username:username, email: email, password: password, 
                                  role: selectedOption, securityQuestion: securityQuestion, 
                                  securityAnswer: securityAnswer, address:address, lattitude:lattitude, longitude:longitude });
      console.log('User created successfully')
      res.send('valid')
    } catch (error) {
      console.error(error);
      res.send('invalid');
    } finally {
      mongoose.connection.close();
    }
  }

const RegisterModel = mongoose.model('Register', userRegistrationSchema)
 
module.exports = { RegisterModel, createUser }