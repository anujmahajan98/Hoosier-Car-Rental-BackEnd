// var mongoose=require('mongoose');
// const { default: UserList } = require('../src/components/AdminView/UserList');
// const uri = "mongodb+srv://anujmaha:aSmaug2022@clustertemp.vgofpu6.mongodb.net/userInfo?retryWrites=true&w=majority";

// var userListSchema = new mongoose.Schema(
//     {
//         username : String,
//         email : { type: String, unique: true},
//         password : String,
//         role : String,
//         securityQuestion : String,
//         securityAnswer : String,
//     },
//     {
//         collection: "userInfo",
//     }
// );

// async function getAllUsers(req, res) {
//     try {
//         await mongoose.connect(uri);
//         console.log("Fetching data from DB");
//         const docs = await LoginModel.find({ email: email }).exec();
//     }
// }


var mongoose=require('mongoose');
const uri = "mongodb+srv://anujmaha:aSmaug2022@clustertemp.vgofpu6.mongodb.net/userInfo?retryWrites=true&w=majority";

var userListSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    username: {
        type: String,
    },
    role: {
        type: String,
    },
}, { collection: 'userInfo' });

async function userList(req, res) {
    try {
      await mongoose.connect(uri);
      console.log("Fetching user List from DB");
      const docs = await UserListModel.find({}, { username: 1, email: 1, role: 1 }).exec();
        res.send(docs);
    } catch (error) {
      console.error(error);
      res.send('invalid');
    } finally {
      mongoose.connection.close();
    }
  }

const UserListModel = mongoose.model('userList', userListSchema)
 
module.exports = { UserListModel, userList }
