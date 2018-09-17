'use strict'

let RedisHandler = require('../datahandler/redis_db_handler');
let config = require('./config')

module.exports = {
        'dbHandler' : new RedisHandler(config.connectionParams),
        'CarTypes' : config.carTypes
    }
