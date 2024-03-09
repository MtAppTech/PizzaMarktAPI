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
