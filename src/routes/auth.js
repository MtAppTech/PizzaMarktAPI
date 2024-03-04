"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | MtAppTech
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/auth:

const auth = require('../controllers/auth')

// URL: /auth

router.post('/login', auth.login)
// router.all('/logout', auth.logout) // swagger-autogen dont catch.
router.get('/logout', auth.logout)


/* ------------------------------------------------------- */
module.exports = router