const Garage = require('../models/garage')

class Controller {
    static create (req, res, next) {
        let { name, address, phone, email, maxCars } = req.body

        Garage.findOne({ name: name })
        .then ( function (foundGarage) {
            if (foundGarage) {
                res
                    .status(200)
                    .json({ message: 'Same garage found, change garage name!' })
            } else {
                Garage.create({
                    name: name,
                    address: address,
                    phone: phone,
                    email: email,
                    maxCars: maxCars
                })
                .then( function (createdGarage) {
                    res
                        .status(200)
                        .json({
                            message: 'Successfully created a garage',
                            data: createdGarage
                        })
                })
                .catch( function (err) {
                    res
                        .status(500)
                        .json({
                            message: 'Something went wrong when creating a garage',
                            error: err.message
                        })
                })
            }
        })
        .catch( function (err) {
            res
                .status(500)
                .json({
                    message: 'Something went wrong when find duplicated garage data',
                    error: err.message
                })
        })
    }

    static findAllGarage (req, res, next) {
        Garage.find()
        .then( function(foundGarages) {
            res
                .status(200)
                .json({
                    message: 'Found Garages',
                    data: foundGarages
                })
        })
        .catch( function (err) {
            res
                .status(500)
                .json({
                    message: 'Finding garages went wrong ..',
                    error: err.message
                })
        })
    }

    static findById (req, res, next) {
        let garageId = req.params.garageId

        console.log(garageId, 'garage id')
        Garage.findById(garageId)
        .then( function (foundGarage) {
            if (foundGarage) {
                res
                    .status(200)
                    .json({
                        message: 'Found garage by it\'s ID successfull',
                        data: foundGarage
                    })
            } else {
                res
                    .status(204)
                    .json({
                        message : 'Can not find garage with provided ID\'s'
                    })
            }
        })
        .catch( function (err) {
            res
                    .status(500)
                    .json({
                        message: 'Something went wrong when finding Garage with provided ID',
                        error: err.message
                    })
        })
    }

    static delete (req, res, next) {
        let garageId = req.params.garageId

        Garage.findById(garageId)
        .then( function(foundGarage) {
            if (foundGarage) {

                Garage.findByIdAndRemove(garageId)
                .then( function(deletedGarage) {
                    res
                        .status(200)
                        .json({ message: 'Successfully deleted a garage',
                                data: deletedGarage })
                })
                .catch( function (err) {
                    res
                        .status(500)
                        .json({
                            message: 'Something went wrong to delete a garage',
                            error: err.message
                        })
                })

            } else {
                res
                    .status(204)
                    .json({
                        message: 'Can\'t found garage with provided ID\'s'
                    })
            }
        })
        .catch( function (err) {
            res
                .status(500)
                .json({
                    message: 'Something went wrong when deleting a garage data',
                    error: err.message
                })
        })
    }

    static update (req, res, next) {
        let garageId = req.params.garageId

        let { name, address, phone, email, maxCars } = req.body

        Garage.findById(garageId)
        .then ( function (foundGarage) {
            if (foundGarage) {
                let updatedGarageName = foundGarage.name, updatedGarageEmail = foundGarage.email, updatedGaragePhone = foundGarage.phone, updatedGarageAddress = foundGarage.address, updatedGarageStock = foundGarage.maxCars

                if (name) {
                    updatedGarageName = name
                }

                if (address) {
                    updatedGarageAddress = address
                }

                if (phone) {
                    updatedGaragePhone = phone
                }

                if (email) {
                    updatedGarageEmail = email
                }

                if (maxCars) {
                    updatedGarageStock = maxCars
                }

                Garage.findByIdAndUpdate(garageId, {
                    name: updatedGarageName,
                    address: updatedGarageAddress,
                    phone: updatedGaragePhone,
                    email: updatedGarageEmail,
                    maxCars: updatedGarageStock
                })
                .then( function ( updatedGarage ) {
                    res
                        .status(200)
                        .json({
                            message: 'Updated Garage Successfull',
                            data: updatedGarage
                        })
                })
                .catch( function (err) {
                    res
                        .status(500)
                        .json({
                            message: 'Updating garage went wrong',
                            error : err.message
                        })
                })
            } else {
                res
                    .status(204)
                    .json({
                        message: 'Can\'t found garage with provided ID'
                    })
            }
        })
        .catch ( function (err) {
            res
                .status(500)
                .json({
                    message: 'Unable to update garage.',
                    error: err.message
                })
        })
    }
}

module.exports = Controller