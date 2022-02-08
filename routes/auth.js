const router = require('express').Router()
const userModel = require('../models/user')

router.route('/register')
    .post(async (req, res ) => {
        const response = await userModel.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        
        res.status(201).json(response)
    })


module.exports = router