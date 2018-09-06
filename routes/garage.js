var express = require('express');
var router = express.Router();
const controllerGarage = require('../controllers/controller-garage')

/* GET home page. */
router
    .get('/', function(req, res, next) {
        res.json({ message: 'garage ok'})
    })

    .post('/', controllerGarage.create)
    .get('/find/all', controllerGarage.findAllGarage)
    .get('/find/:garageId', controllerGarage.findById)
    .put('/:garageId', controllerGarage.update)
    .delete('/:garageId', controllerGarage.delete)


module.exports = router;
