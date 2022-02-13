const router = require('express').Router()
const {verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyJWT} = require('../routes/verifyJWT')
const cartModel = require('../models/order')



router.post('/',verifyJWT, async (req, res ) => {
    const newCart = cartModel(req.body)
    try {
        const cart = await newCart.save()

        res.status(200).json(cart)
    } catch (error) {
        res.status(403).json("Error: " + error)
    }
})

router.get('/', async (req, res ) => {
    try {
        const cart = await cartModel.find()

        res.status(200).json(cart)
    } catch (error) {
        res.status(403).json("Error: " + error)
    }
})

router.put('/:id',verifyTokenAndAuthorization, async (req, res ) => {
    const cart = cartModel.findById(req.params.id)
    if (!cart) {
        return res.status(404).send('The cart with the given ID was not found.')
    }
    try {
        const cart = await cartModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
            }, {new: true})

        res.status(200).json(cart)

    } catch (error) {
        res.status(403).json("Error: " + error)
    }
})

router.delete('/:id',verifyTokenAndAuthorization, async (req, res ) => {
    try {
        const cart = await cartModel.findByIdAndDelete(req.params.id)
       
        res.status(200).json("cart deleted")
    } catch (error) {
        res.status(403).json("Error: " + error)
    }
})

router.get('/:userId',verifyTokenAndAuthorization, async (req, res ) => {
    try {
        const cart = await cartModel.find({ userId: req.params.userId });
        res.status(200).json(cart)
    } catch (error) {
        res.status(403).json("Error: " + error)
    }
})


    
module.exports = router 