const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const LoginModel = require('./login');
const { getUserInfo } = require('./login');
const { createUser } = require('./signup');
const { checkUnieqEmail } = require('./checkEmailUniqueness');
const { resetPassowrd } = require('./resetPassword');
const { savePayment } = require('./savePayments');
// const { AddNewCar } = require('./AddNewCar');
const { userList } = require('./userList')
const { carList } = require('./AddNewCar')
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
// const RegisterModel = require('./signup');
// const { createUser } = require('./singup');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log('signup')
  res.send('Hey!');
});

const uri = "mongodb+srv://anujmaha:aSmaug2022@clustertemp.vgofpu6.mongodb.net/userInfo?retryWrites=true&w=majority";
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.post('/signup', (req, res) => {
  console.log('signup')
//   let username = req.body.username;
//   let email = req.body.email;
//   let password = req.body.password;
//   let role = req.body.email;
//   console.log(username, password, email, role);
//   res.send(`Username: ${username} Password: ${password}`);
//   res.send(`User with username : ${username} has been registered`)
    createUser(req, res)
});

app.post('/login', (req, res) => {
  console.log('login')
  getUserInfo(req, res);
});

app.post('/checkEmailUniqueness', (req, res) => {
    console.log('checkEmailUniqueness')
    checkUnieqEmail(req, res);
  });

app.post('/resetPassword', (req, res) => {
    console.log('resetPassword')
    resetPassowrd(req, res);
  });

  app.post('/payment', (req, res) => {
    console.log('payment')

    let { amount, id } = req.body
    console.log(amount)
    console.log(id)
    try {
      const payment = stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Hoosier Rentals",
        payment_method: id,
        confirm: true
      })
      console.log("Payment", payment)
      res.json({
        message: "Payment successful",
        success: true,
      })
      savePayment(req, res)
    } catch (error) {
      console.log("Error", error)
      res.json({
        message: "Payment failed",
        success: false
      })
    }
  });

  app.post('/userList', (req, res) => {
    console.log('User List')
    userList(req, res);
  });

  app.post('/AddNewCar',(req,res) => {
    console.log('CarList')
    carList(req,res);
    })

app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});