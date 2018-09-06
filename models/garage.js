const mongoose = require('mongoose')
const Schema = mongoose.Schema

let garageSchema = Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    maxCars: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

let garage = mongoose.model('garage', garageSchema)

module.exports = garage