"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | MtAppTech
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/pizza:

const pizza = require('../controllers/pizza')
const permissions = require('../middlewares/permissions')

// URL: /pizzas

router.route('/')
    .get(pizza.list) // AllowAny
    .post(permissions.isAdmin, pizza.create)

router.route('/:id')
    .get(pizza.read) // AllowAny
    .put(permissions.isAdmin, pizza.update)
    .patch(permissions.isAdmin, pizza.update)
    .delete(permissions.isAdmin, pizza.delete)

/* ------------------------------------------------------- */
module.exports = router