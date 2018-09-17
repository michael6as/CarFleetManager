'use strict';

let uuid = require('uuid');

class CarModel {
    constructor(vehicleDict){
        if(vehicleDict['carId'] == null){
            this.carId = uuid();
            this.timeCreated = new Date().getTime();
            this.lastUpdated = this.timeCreated;
        } else{
            this.carId = vehicleDict['carId'];
            this.timeCreated = vehicleDict['timeCreated'];
            this.lastUpdated = vehicleDict['lastUpdated'];
        }
        this.carName = vehicleDict['carName'];
        this.carType = vehicleDict['carType'];
        this.picture = vehicleDict['picture'];
    }
}

module.exports = CarModel;
