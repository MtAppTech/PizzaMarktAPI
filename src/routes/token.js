"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | MtAppTech
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/token:

const token = require('../controllers/token')

// URL: /tokens

const { isAdmin } = require('../middlewares/permissions')

router.use(isAdmin)

router.route('/')
    .get(token.list)
    .post(token.create)

router.route('/:id')
    .get(token.read)
    .put(token.update)
    .patch(token.update)
    .delete(token.delete)

/* ------------------------------------------------------- */

// const permissions = require('../middlewares/permissions')

// router.route('/')
//     .get(permissions.isAdmin, token.list)
//     .post(permissions.isAdmin, token.create)

// router.route('/:id')
//     .get(permissions.isAdmin, token.read)
//     .put(permissions.isAdmin, token.update)
//     .patch(permissions.isAdmin, token.update)
//     .delete(permissions.isAdmin, token.delete)

/* ------------------------------------------------------- */
module.exports = router