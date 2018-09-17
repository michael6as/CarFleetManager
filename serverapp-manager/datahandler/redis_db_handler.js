let DbHandler = require('./db_handler')
let CarModel = require('../core/car_model');
let CarTypeEnum = require('../core/car_type');
let redis = require('redis')

class RedisHandler extends DbHandler{
    constructor(connParams){
        super(connParams);
        this.redisClient = '';
        this.initConnection()
    }
    initConnection (){
        if (!this.validateParams()){
            console.log('Error occurred while initializing connection')
            return;
        }
        this.redisClient = redis.createClient();
        this.redisClient.on("error", function (err) {
            console.log("Error " + err);
        });
    }
    validateParams(){
        return 'redisHost' in this.connectionParams;

    }
    matchResultToQuery(queryParams, vehicleResult){
        if (queryParams['searchString'] !== undefined) {
            if (vehicleResult.carId.includes(queryParams['searchString']) || vehicleResult.carName.includes(queryParams['searchString'])) {
                return new CarModel(vehicleResult)
            }
            return null
        } else if (queryParams['carType'] !== undefined) {
            if (queryParams['carType'] === vehicleResult.carType){
                return new CarModel(vehicleResult)
            }
            return null
        } else {
            return new CarModel(vehicleResult)
        }
    }
    async getVehicles(queryParams){
        let redisClient = this.redisClient
        let matchResultToQuery = this.matchResultToQuery
        let promise = new Promise((resolve, reject) => {
            redisClient.hgetall("Vehicles", async function (err, results) {
                let matchedCars = []
                for (let i in results){
                    let matchedCar = matchResultToQuery(queryParams, JSON.parse(results[i]))
                    if (matchedCar !== null){
                        matchedCars.push(matchedCar)
                    }
                }
                resolve(JSON.stringify(matchedCars))
            })
        });
        return await promise
        }
    async addVehicle(car){
        this.redisClient.hset(["Vehicles", car.carId, JSON.stringify(car)], redis.print);
        return await this.getVehicles('')
    }
    async deleteVehicle(carId){
        this.redisClient.hdel(["Vehicles", carId], redis.print);
        return await this.getVehicles('')
    }
}

module.exports = RedisHandler
