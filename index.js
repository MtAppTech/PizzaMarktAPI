"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | MtAppTech
------------------------------------------------------- */
/*
    $ cp .env-sample .env
    $ npm init -y
    $ npm i express dotenv mongoose express-async-errors morgan
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

/* ------------------------------------------------------- */
// Routes:
// HomePath:
app.all("/", (req, res) => {
    res.send({
      error: false,
      message: "Welcome to PIZZA MARKT API",
      user: req.user,
    });
  });

  // topping:
app.use('/toppings', require('./src/routes/topping'))

/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));
  // RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));