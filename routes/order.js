const router = require('express').Router()
const {verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyJWT} = require('../routes/verifyJWT')
const orderModel = require('../models/order')



router.post('/',verifyJWT, async (req, res ) => {
    const newOrder = orderModel(req.body)
    try {
        const order = await newOrder.save()
        console.log(order)

        res.status(200).json(order)
    } catch (error) {
        res.status(403).json("Error: " + error)
    }
})

router.get('/', async (req, res ) => {
    try {
        const order = await orderModel.find()

        res.status(200).json(order)
    } catch (error) {
        res.status(403).json("Error: " + error)
    }
})

router.put('/:id',verifyTokenAndAdmin, async (req, res ) => {
    const order = orderModel.findById(req.params.id)
    if (!order) {
        return res.status(404).send('The order with the given ID was not found.')
    }
    try {
        const order = await orderModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
            }, {new: true})

        res.status(200).json(order)

    } catch (error) {
        res.status(403).json("Error: " + error)
    }
})

router.delete('/:id',verifyTokenAndAdmin, async (req, res ) => {
    try {
        const order = await orderModel.findByIdAndDelete(req.params.id)
       
        res.status(200).json("order deleted")
    } catch (error) {
        res.status(403).json("Error: " + error)
    }
})

router.get('/:userId',verifyTokenAndAuthorization, async (req, res ) => {
    try {
        const order = await orderModel.find({ userId: req.params.userId });
        res.status(200).json(order)
    } catch (error) {
        res.status(403).json("Error: " + error)
    }
})


    
module.exports = router 