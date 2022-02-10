const router = require('express').Router()
const {verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyJWT} = require('../routes/verifyJWT')
const productModel = require('../models/product')



router.post('/',verifyTokenAndAdmin, async (req, res ) => {
    const newProduct = new productModel(req.body)
    try {
        // console.log(req.body)
        const product = await newProduct.save()
        console.log(product)

        res.status(200).json(product)
    } catch (error) {
        res.sendStatus(403)
    }
})

// router.delete('/:id',verifyTokenAndAuthorization, async (req, res ) => {
//     try {
//         const deleteUser = await userModel.findByIdAndDelete(req.params.id)
//         res.status(200).json("user deleted")
//     } catch (error) {
//         res.sendStatus(403)
//     }
// })

// router.get('/:id',verifyTokenAndAdmin, async (req, res ) => {
//     try {
//         const getUser = await userModel.findById(req.params.id)
//         const {password, ...others} = getUser._doc
//         res.status(200).json(others)
//     } catch (error) {
//         res.sendStatus(403)
//     }
// })

// router.get('/',verifyTokenAndAdmin, async (req, res ) => {
//     try {
//         query = req.query.new
//         const users = query
//         ? await userModel.find().sort({ _id: -1 }).limit(5)
//         : await userModel.find();
//         res.status(200).json(users)
//     } catch (error) {
//         res.sendStatus(403)
//     }
// })

// router.get('/data',verifyTokenAndAdmin, async (req, res ) => {
//     const date = new Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
//     console.log(lastYear)

//     try {
//         const data = await userModel.aggregate([
//             {$match: {createdAt: {$gte: lastYear}}},
//             {$project: {month: {$month: "$createdAt"}}},
//             {$group: {_id: "$month",
//                         total: {$sum: 1}
//                     }
//             }
//         ])
//         res.status(200).json(data)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

    
module.exports = router 