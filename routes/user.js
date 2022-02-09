const router = require('express').Router()

router.route('/:id')
    .put((req, res ) => {
        console.log('get request')
    })
    
module.exports = router 