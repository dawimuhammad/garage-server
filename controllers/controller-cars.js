const Car = require('../models/car')
const moment = require('moment')

class Controller {
    static create (req, res, next) {
        let { brand, model, year, color, mileage, engine, power, registration_date, price, image_url } = req.body
        
        let registrationDate = moment().format('LL');

        if (registration_date) {
            registrationDate = registration_date
        }

        Car.findOne({ model: model })
        .then( function (foundCar) {
            if (foundCar) {
                // found same car model
                res
                    .status(200)
                    .json({
                        message: 'Same car model found, change car model!'
                    })
            } else {
                // create car model
                Car.create({
                    brand: brand,
                    model: model,
                    year: year,
                    color: color,
                    mileage: mileage,
                    engine: engine,
                    power: power,
                    registration_date: registrationDate,
                    price: price,
                    image_url: image_url
                })
                .then( function(createdCar) {
                    res
                        .status(200)
                        .json({
                            message: 'Car successfully created!',
                            createdCar: createdCar
                        })
                })
                .catch( function(err) {
                    res
                        .status(500)
                        .json({
                            message: 'Creating car goes wrong ..',
                            error: err.message
                        })
                })
            }
        })
        .catch( function (err) {
            res
                .status(500)
                .json({
                    message: 'Find duplicate car goes wrong ..',
                    error: err.message
                })
        })
    }

    static find (req, res, next) {
        let keyword = req.body.keyword
        
        Car.find({ model: { $regex: '.*' + keyword + '.*' } })
        .then( function(foundCars) {
            if (foundCars.length > 0) {
                res
                .status(200)
                .json({
                    message: 'Found car successfull',
                    data: foundCars })
            } else {
                res
                .status(200)
                .json({
                    message: 'No car data available for the keyword' })
            }
        })
        .catch( function (err) {
            res
                .status(500)
                .json({
                    message: 'Found car goes wrong',
                    error: err.message
                })
        })
    }

    static findAllCars (req, res, next) {
        Car.find()
        .then( function(foundCars) {
            res
            .status(200)
            .json({
                message: 'Found car successfull',
                data: foundCars })
        })
        .catch( function (err) {
            res
                .status(500)
                .json({
                    message: 'Found car goes wrong',
                    error: err.message
                })
        })
    }

    static findById (req, res, next) {
        let carId = req.params.carId

        Car.findById (carId)
        .then( function (foundCar) {
            if (foundCar) {
                res
                    .status(200) 
                    .json({
                        message: 'Got a car',
                        data: foundCar
                    })
            } else {
                res
                    .status(204)
                    .json({
                        message : 'Can not find car with provided ID\'s'
                    })
            }
        })
        .catch( function (err) {
                res
                    .status(500)
                    .json({
                        message: 'Something went wrong when finding Car with provided ID',
                        error: err.message
                    })
        })
    }

    static delete (req, res, next) {
        let carId = req.params.carId

        Car.findById(carId)
        .then( function(foundCar) {
            if (foundCar) {

                Car.findByIdAndRemove(carId)
                .then( function(deletedCar) {
                    res
                        .status(200)
                        .json({ message: 'Successfully deleted a car',
                                data: deletedCar })
                })
                .catch( function (err) {
                    res
                        .status(500)
                        .json({
                            message: 'Something went wrong to delete a car',
                            error: err.message
                        })
                })

            } else {
                res
                    .status(204)
                    .json({
                        message: 'Can\'t found car with provided ID\'s'
                    })
            }
        })
        .catch( function (err) {
            res
                .status(500)
                .json({
                    message: 'Something went wrong when deleting a car',
                    error: err.message
                })
        })
    }

    static update (req, res, next) {
        let carId = req.params.carId
        
        // get updated car field
        let { brand, model, year, color, mileage, engine, power, price, image_url } = req.body

        Car.findById(carId)
        .then( function(foundCar) {
            if (foundCar) {
                // res.json({ car : foundCar})
                let car = foundCar

                let updatedBrand = car.brand, updatedModel = car.model, updatedYear = car.year, updatedColor = car.color, updatedMileage = car.mileage, updatedEngine = car.engine, updatedPower = car.power,updatedPrice = car.price, updatedImageUrl = car.image_url

                if (brand) {
                    updatedBrand = brand
                }

                if (model) {
                    updatedModel = model
                }

                if (year) {
                    updatedYear = year
                }

                if (color) {
                    updatedColor = color
                }

                if (mileage) {
                    updatedMileage = mileage
                }

                if (engine) {
                    updatedEngine = engine
                }

                if (power) {
                    updatedPower = power
                }

                if (price) {
                    updatedPrice = price
                }

                if (image_url) {
                    updatedImageUrl = image_url
                }

                Car.findByIdAndUpdate(carId, {
                    brand: updatedBrand,
                    model: updatedModel,
                    year: updatedYear,
                    color: updatedColor,
                    mileage: updatedMileage,
                    engine: updatedEngine,
                    power: updatedPower,
                    price: updatedPrice,
                    image_url: updatedImageUrl
                })
                .then( function (updatedCar) {
                    res
                        .status(200)
                        .json({
                            message: 'Updated car successfull!',
                            data: updatedCar
                        })
                })
                .catch( function (err) {
                    res
                        .status(500)
                        .json({
                            message: 'Updating car went error!',
                            error: err.message
                        })
                })
            } else {
                res
                    .status(204)
                    .json({
                        message: 'Can\'t found car with provided ID\'s'
                    })
            }
        })
        .catch( function (err) {
            res
                .status(500)
                .json({
                    message: 'Something went wrong when finding a car',
                    error: err.message
                })
        })
    }
}

module.exports = Controller