const mongoose = require('mongoose')
const Schema = mongoose.Schema

let carSchema = Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
    },
    color: String,
    mileage: Number,
    engine: Number,
    power: Number,
    registration_date: String,
    price: Number,
    image_url: String
}, {
    timestamps: true
})

let cars = mongoose.model('car', carSchema)

module.exports = cars