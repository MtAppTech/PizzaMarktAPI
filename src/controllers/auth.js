"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | MtAppTech
------------------------------------------------------- */
// Auth Controller

const User = require('../models/user')
const Token = require('../models/token')
const passwordEncrypt = require('../helpers/passwordEncrypt')

module.exports = {

    login: async (req, res) => {
        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password.'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                }
            }
        */

        const { username, password } = req.body

        if (username && password) {

            const user = await User.findOne({ username })

            if (user && user.password == passwordEncrypt(password)) {

                if (user.isActive) {

                    /* TOKEN */

                    let tokenData = await Token.findOne({ userId: user._id })

                    if (!tokenData) {
                        const tokenKey = passwordEncrypt(user._id + Date.now())
                        tokenData = await Token.create({ userId: user._id, token: tokenKey })
                    }

                    res.status(200).send({
                        error: false,
                        token: tokenData.token,
                        user
                    })

                    /* TOKEN */

                } else {

                    res.errorStatusCode = 401
                    throw new Error('This account is not active.')
                }

            } else {

                res.errorStatusCode = 401
                throw new Error('Wrong username or password.')
            }

        } else {

            res.errorStatusCode = 401
            throw new Error('Please enter username and password.')
        }

    },

    logout: async (req, res) => {
        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Logout"
            #swagger.description = 'Delete token key.'
        */

        

    },

}