const router = require('express').Router()

router.route('/')
    .get((req, res ) => {
        console.log('get request')
    })
    .post((req, res ) => {
        console.log('get request')
        res.json('post r')
    })


module.exports = router