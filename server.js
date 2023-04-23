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
const { approveCar } = require('./ApproveCar');
const { rejectCar } = require('./RejectCar');
const { CarListingForm } = require('./CarListingForm');
const { ownerBookingDetails } = require('./ownerBookingDetails');
//raja - 23rd april
const { getCarInfo } = require('./ownercars');
//raja - 23rd april
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

  //raja - 23rd april
  app.post('/ownercars',(req,res) => {
  
    console.log('Owner Cars');
    getCarInfo(req,res);

    
  })

  app.post('/payment', (req, res) => {
    console.log('Booking payment')

    let { PaymentId,price, ownerEmail, userEmail, carType, carModel, carCompany,
          carNumber, ownerName, paymentDate } = req.body
    console.log(price)
    console.log(PaymentId)
    console.log(userEmail)
    console.log(paymentDate)
    try {
      const payment = stripe.paymentIntents.create({
        amount: price * 100,
        currency: "USD",
        receipt_email: userEmail,
        description: "Hoosier Rentals",

        payment_method: PaymentId,
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
//raja - 23rd april

app.post('/userList', (req, res) => {
    console.log('User List')
    userList(req, res);
  });

  app.post('/AddNewCar',(req,res) => {
    console.log('CarList')
    carList(req,res);
    })

    app.post('/CarListingForm', (req, res) => {
      console.log('CarListingForm')
      console.log(req.body.userEmail)
      CarListingForm(req, res);
    });

  app.post('/ownerBookingDetails',(req,res) => {
      console.log('OwnerBookingDetails 1')
      ownerBookingDetails(req,res);
  });

app.post('/ApproveCar',(req,res) => {
    console.log('Car Approved')
    approveCar(req,res);
})

app.post('/RejectCar',(req,res) => {
    console.log('Car Rejected')
    rejectCar(req,res);
})

var port = process.env.port || 5001

app.listen(port, () => {
  console.log('Hey')
  console.log('Server is running on http://localhost:5001');
});
