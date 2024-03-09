"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | MtAppTech
------------------------------------------------------- */
/*
  /*
    $ cp .env-sample .env
    $ npm init -y
    $ npm i express dotenv mongoose express-async-errors morgan
    $ npm i jsonwebtoken
    $ npm i swagger-autogen swagger-ui-express redoc-express
    $ npm i nodemailer multer
    $ mkdir logs
    $ nodemon

*/
const express = require("express");
const app = express();

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json());

// Check Token:
app.use(require("./src/middlewares/authentication"));

// morgan-logger:
app.use(require("./src/middlewares/logger"));

// res.getModelList:  // get model listlerin calisabilmesi icin eklemek lazim
app.use(require("./src/middlewares/findSearchSortPage"));

/* ------------------------------------------------------- */

// Sending E-Mail:
// $ npm i nodemailer

const nodemailer = require("nodemailer");

//Create Test (Fake) Email Account
//nodemailer.createTestAccount().then((email)=> console.log(email))
/*
{
  user: 'u7wojd7ew54ujjzu@ethereal.email',
  pass: 'huh2391F9wWuQQ26tF',
  smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
  imap: { host: 'imap.ethereal.email', port: 993, secure: true },
  pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
  web: 'https://ethereal.email'
}
*/
// Connect to mail-server:
/*
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true, tls, ssl
  auth: {
    user: 'u7wojd7ew54ujjzu@ethereal.email',
    pass: 'huh2391F9wWuQQ26tF',
  },
});
transporter.sendMail({
  from: 'u7wojd7ew54ujjzu@ethereal.email',
  to: 'mt.app.tech@gmail.com', // 'a@b.com, b@c.com'
  subject: 'Hello',
  // Message:
  text: 'Hello There. How are you?',
  html: '<b>Hello There.</b> <p>How are you?</p>',
}, (error, success) => { 
  error ? console.log('error:', error) : console.log('success:', success)
})
*/

// //? GoogleMail (gmail):
// //* Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mt.app.tech@gmail.com",
    pass: "0000 0000 0000 0000",
  },
});
transporter.sendMail(
  {
    from: "mt.app.tech@gmail.com",
    to: "murat.topal.ankara@gmail.com",
    subject: "Hello",
    text: "Hello There. How are you?",
    html: "<b>Hello There.</b> <p>How are you?</p>",
  },
  (error, success) => {
    error ? console.log("error:", error) : console.log("success:", success);
  }
);
/* ------------------------------------------------------- */

// Routes:
// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PIZZA API",
    documents: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
    user: req.user,
  });
});

// auth:
app.use("/auth", require("./src/routes/auth"));
// user:
app.use("/users", require("./src/routes/user"));
// token:
app.use("/tokens", require("./src/routes/token"));
// order:
app.use("/orders", require("./src/routes/order"));
// pizza:
app.use("/pizzas", require("./src/routes/pizza"));
// topping:
app.use("/toppings", require("./src/routes/topping"));
// document:
app.use("/documents", require("./src/routes/document"));

/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
//require('./src/helpers/sync')() // !!! It clear database.
