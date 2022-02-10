const router = require('express').Router()
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../routes/verifyJWT')
const userModel = require('../models/user')
const bcrypt = require('bcrypt')


router.put('/:id',verifyTokenAndAuthorization, async (req, res ) => {

    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10)
    }

    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {
            

            $set: req.body
            
        }, {new: true})
        res.status(200).json(updatedUser)
    } catch (error) {
        res.sendStatus(403)
    }
})

router.delete('/:id',verifyTokenAndAuthorization, async (req, res ) => {
    try {
        const deleteUser = await userModel.findByIdAndDelete(req.params.id)
        res.status(200).json("user deleted")
    } catch (error) {
        res.sendStatus(403)
    }
})

router.get('/:id',verifyTokenAndAdmin, async (req, res ) => {
    try {
        const getUser = await userModel.findById(req.params.id)
        const {password, ...others} = getUser._doc
        res.status(200).json(others)
    } catch (error) {
        res.sendStatus(403)
    }
})

router.get('/',verifyTokenAndAdmin, async (req, res ) => {
    try {
        const getUser = await userModel.find()
        res.status(200).json(getUser)
    } catch (error) {
        res.sendStatus(403)
    }
})
    
module.exports = router 