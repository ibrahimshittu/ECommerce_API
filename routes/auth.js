const router = require('express').Router()
const userModel = require('../models/user')
const bcrypt = require('bcrypt')

router.route('/register')
    .post(async (req, res ) => {

        const {username, email, password } = req.body
        if (!username || !email || !password) return res.status(400).json({'message': 'input required fields'})
        
        try {
            const hashedPwd = await bcrypt.hash(password, 10)
            const response = await userModel.create({
                username: req.body.username,
                email: req.body.email,
                password: hashedPwd,
            })

            res.status(201).json(response)
        } catch (error) {
            res.status(500).json(error.message)
        }
    })

router.route('/login')
    .post(async (req, res ) => {

        const {username, password } = req.body
        if (!username || !password) return res.status(400).json({'message': 'input required fields'})
        
        try {
            const user = await User.findOne({username: req.body.username})
            !user && res.status(204).json('no user found')

            const passwordMatch = await bcrypt.compare(user.password, req.body.password)
            if (passwordMatch) {
                
                const response = await userModel.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPwd,
                })

                res.status(201).json(response)
            } else {
                res.sendStatus(401);
            }
             
        } catch (error) {
            res.status(500).json(error.message)
        }
    })


module.exports = router