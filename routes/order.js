const router = require('express').Router()
const {verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyJWT} = require('../routes/verifyJWT')
const orderModel = require('../models/order')



router.post('/',verifyTokenAndAdmin, async (req, res ) => {
    const newProduct = productModel(req.body)
    try {
        const product = await newProduct.save()
        console.log(product)

        res.status(200).json(product)
    } catch (error) {
        res.status(403).json("Error: " + error)
    }
})

router.get('/',verifyTokenAndAdmin, async (req, res ) => {
    try {
        const product = await productModel.find()

        res.status(200).json(product)
    } catch (error) {
        res.status(403).json("Error: " + error)
    }
})

router.put('/:id',verifyTokenAndAdmin, async (req, res ) => {
    const product = productModel.findById(req.params.id)
    if (!product) {
        return res.status(404).send('The product with the given ID was not found.')
    }
    try {
        const product = await productModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
            }, {new: true})

        res.status(200).json(product)

    } catch (error) {
        res.status(403).json("Error: " + error)
    }
})

router.delete('/:id',verifyTokenAndAdmin, async (req, res ) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id)
       
        res.status(200).json("product deleted")
    } catch (error) {
        res.status(403).json("Error: " + error)
    }
})

router.get('/:id',verifyTokenAndAdmin, async (req, res ) => {
    try {
        const product = await productModel.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(403).json("Error: " + error)
    }
})


    
module.exports = router 