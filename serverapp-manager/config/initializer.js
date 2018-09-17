'use strict'

// This JS file is for wrapping all the instantiations needed to get server running.
// If we had a factory for CarModel (didn't had time to do) we can instantiate it here and inject it to the class
let RedisHandler = require('../datahandler/redis_db_handler');
let config = require('./config')

module.exports = {
        'dbHandler' : new RedisHandler(config.connectionParams),
        'CarTypes' : config.carTypes
    }
