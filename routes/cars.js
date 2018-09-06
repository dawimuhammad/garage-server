const express = require('express');
const router = express.Router();
const controllerCar = require('../controllers/controller-cars')

/* GET home page. */
router
    .get('/', function(req, res, next) {
        res.json({ message: 'cars ok'})
    })

    .post('/', controllerCar.create)
    .get('/find', controllerCar.find)
    .get('/find/all', controllerCar.findAllCars)
    .get('/find/:carId', controllerCar.findById)
    .put('/:carId', controllerCar.update)
    .delete('/:carId', controllerCar.delete)

module.exports = router;
