"use strict"
const { model } = require('mongoose')
//const { Schema, Mongoose } = require('mongoose')
/* -------------------------------------------------------
    NODEJS EXPRESS | MtAppTech
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- *
{
    "name": "Egg"
}
/* ------------------------------------------------------- */
// Topping Model:

const ToppingSchema= new mongoose.Schema({
    name:{
        type    :String,
        trim    :true,
        required:true,
        unique  :true
    }

},{
    collection: "toppings", // db table name
    timestamps: true        // createdAt & updatedAt

})
/* ------------------------------------------------------- */
module.exports = mongoose.model('Topping', ToppingSchema)
