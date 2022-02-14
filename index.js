require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const authRoute = require('./routes/auth')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')

app.use(express.json());

app.use('/api/user', userRoute)
app.use('/api/product', productRoute)
app.use('/api/auth', authRoute)
app.use('/api/cart', cartRoute)
app.use('/api/order', orderRoute)


mongoose.connect(process.env.DATABASE_URI).then(()=>{
    console.log('DB connected successfully')
    app.listen(process.env.PORT || 3500, () => {
    console.log('Server is running')
})
}).catch((err) => console.log(err.message))


