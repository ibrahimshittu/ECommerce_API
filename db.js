const mongoose = require('mongoose')

const db = async () => {
    try {
        mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = db