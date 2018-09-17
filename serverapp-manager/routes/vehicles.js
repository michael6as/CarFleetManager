var express = require('express');
var router = express.Router();

let CarModel = require('../core/car_model');
let Initializer = require('../config/initializer');

let dbHandler = Initializer.dbHandler;

router.get('/', async function(req, res, next) {
    try{
        let foundcars = await dbHandler.getVehicles(req.query);
        res.send(foundcars);
    }catch (e) {
        console.log(e)
    }
});

router.post('/', async function (req, res, next) {
    let carObj = new CarModel(req.body)
    let newCars = await dbHandler.addVehicle(carObj)
    res.send(newCars);
});

router.delete('/', async function (req, res, next){
    let newCars = await dbHandler.deleteVehicle(req.query['deleteId'])
    res.send(newCars);
});

module.exports = router;
