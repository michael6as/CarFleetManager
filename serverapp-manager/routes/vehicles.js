var express = require('express');
var router = express.Router();

var DbHandler = require('../datahandler/db_handler');
let dbhandler = new DbHandler({'host':'localhost','port':1995});

/* GET vehicles listing. */
router.get('/', function(req, res, next) {
    try{
        let foundcars = dbhandler.getVehicles(req.query);
        res.send(foundcars);
    }catch (e) {
        console.log(e)
    }
});

router.post('/', function (req, res, next) {
    for(let vehicle in dbhandler.sampleVehicles){
        if(vehicle.carId === req.body['carId']){
            vehicle = req.body;
            res.send(dbhandler.sampleVehicles);
            return;
        }
    }
    dbhandler.addVehicle(req.body['carName'], req.body['dateCreated'], req.body['carType'], req.body['lastUpdated']);
    res.send(dbhandler.sampleVehicles);
});

module.exports = router;
