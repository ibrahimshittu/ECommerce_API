const router = require('express').Router()
const {verifyTokenAndAuthorization} = require('../routes/verifyJWT')
const userModel = require('../models/user')
const bcrypt = require('bcrypt')


router.put('/:id',verifyTokenAndAuthorization, async (req, res ) => {

    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10)
    }

    console.log(req.body.password)
    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {
            

            $set: req.body
            
        }, {new: true})
        res.status(200).json(updatedUser)
    } catch (error) {
        res.sendStatus(403)
    }
})
    
module.exports = router 