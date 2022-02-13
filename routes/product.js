const router = require('express').Router()
const {verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyJWT} = require('../routes/verifyJWT')
const productModel = require('../models/product')



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

router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;

        if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
        products = await Product.find({
            categories: {
            $in: [qCategory],
            },
        });
        } else {
        products = await Product.find();
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});

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

router.get('/:id', async (req, res ) => {
    try {
        const product = await productModel.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(403).json("Error: " + error)
    }
})


    
module.exports = router 