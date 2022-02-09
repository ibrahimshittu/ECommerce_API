const router = require('express').Router()
const {verifyTokenAndAuthorization} = require('../routes/verifyJWT')
const userModel = require('../models/user')
const bcrypt = require('bcrypt')


router.route('/:id')
    .put(verifyTokenAndAuthorization(), async (req, res ) => {

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10)
        }
        try {
            const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password

                // $set: req.body
                
            }, {new: true})
            res.send(200).json(updatedUser)
        } catch (error) {
            res.sendStatus(403)
        }
    })
    
module.exports = router 