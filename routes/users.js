const router = require('express').Router()

router.route('/')
    .get((req, res ) => {
        console.log('get request')
    })


module.exports = router