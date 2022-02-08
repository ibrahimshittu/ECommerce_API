require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')

app.use(express.json());

app.use('/api/user', userRoute)
app.use('/api/user', authRoute)


mongoose.connect(process.env.DATABASE_URI).then(()=>{
    console.log('DB connected successfully')
    app.listen(process.env.PORT || 3500, () => {
    console.log('Server is running')
})
}).catch((err) => console.log(err.message))


