'use strict'

let CarModel = require('../core/car_model');
let CarTypeEnum = require('../core/car_type');

// Base class for handling the car fleet. This is the basic class so there are some default implementations to check sanity of the code
class DbHandler{
    constructor(connParams){
        this.connectionParams = connParams
        this.sampleVehicles = []
    }
    initConnection(){
        this.sampleVehicles = [
            new CarModel('suzuki', new Date(2015,6,6).getTime(), CarTypeEnum.Private,new Date(2015,12,12).getTime()),
            new CarModel('dodge', new Date(2015,6,7).getTime(), CarTypeEnum.SUV),
            new CarModel('ram', new Date(2015,6,8).getTime(), CarTypeEnum.Truck)
            ];
    }
    getVehicles(queryParams){
        if(Object.keys(queryParams).length < 1){
            return this.sampleVehicles;
        }
        let filteredList = [];
        for(let i in this.sampleVehicles){
            if(this.sampleVehicles[i].carId.includes(queryParams.searchString) || this.sampleVehicles[i].carName.includes(queryParams.searchString)) {
                filteredList.push(this.sampleVehicles[i])
            }
        }
        return filteredList;
    }
    addVehicle(car_name, date_created, car_type, last_updated){
        this.sampleVehicles.add(new CarModel(car_name,date_created,car_type,last_updated))
    }
}

module.exports = DbHandler;
