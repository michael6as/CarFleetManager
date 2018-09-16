'use strict';

let uuid = require('uuid');

class CarModel {
    constructor(car_name, time_created, car_type, last_updated, car_id=null){
        if(car_id == null){
            car_id = uuid()
        }
        this.carId = car_id;
        this.carName = car_name;
        this.timeCreated = time_created;
        this.carType = car_type;
        this.lastUpdated = last_updated;
    }
}

module.exports = CarModel;
