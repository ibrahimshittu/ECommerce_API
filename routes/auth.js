const router = require('express').Router()
const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.route('/register')
    .post(async (req, res ) => {

        const {username, email, password } = req.body
        if (!username || !email || !password) return res.status(400).json({'message': 'input required fields'})
        
        try {
            const hashedPwd = await bcrypt.hash(req.body.password, 10)
            const response = await userModel.create({
                username: req.body.username,
                email: req.body.email,
                password: hashedPwd,
            })

            const {password, ...others} = response._doc

            res.status(201).json(others)
        } catch (error) {
            res.status(500).json(error.message)
        }
    })


router.route('/login')
    .post(async (req, res ) => {

        const {username, password } = req.body
        if (!username || !password) return res.status(400).json({'message': 'input required fields'})
        
        try {
            const user = await userModel.findOne({username: req.body.username})
            if (!user) return res.status(204).json('no user found')

            const passwordMatch = bcrypt.compare(user.password, req.body.password)
            if (passwordMatch) {
                
                const accessToken =jwt.sign(
                    {"id": user.username, "isAdmin": user.isAdmin},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: '3000s'}
                )
                const {password, ...others} = user._doc

                res.status(200).json({...others, accessToken})
            } else {
                res.sendStatus(401);
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    })

module.exports = router