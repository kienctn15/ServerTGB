var events = require('events');
var emitter = module.exports.emitter = new events.EventEmitter();

var util = require('util');
var Sequelize = require('sequelize');
var sequelize = undefined;
var User = undefined;
 
module.exports.connect = function(params, callback) {
    sequelize = new Sequelize(params.dbname,
        params.username,
        params.password,
        params.params);
        User= sequelize.define('Customer', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            username:Sequelize.STRING,
            title:Sequelize.STRING,
            address:Sequelize.STRING,
            date:Sequelize.STRING,
            timestart:Sequelize.STRING,
            timeend:Sequelize.STRING,
            description: Sequelize.STRING
            });
        User.sync().then(function() {
        callback()
    }).error(function(err) {
        callback(err);
    });
}



module.exports.findByUsername = function(username, callback) {
    User.find({where: {username: username}}).then(function(user) {
        if(!user) {
            callback(true);
        } else {
            callback(false);
        } 
    });
}


module.exports.customer_save_timetable = function(username,title,address,date,timestart,timeend,description, callback) {
    User.create({
        id: '',
        username: username,
        title: title,
        address: address,
        date: date,
        timestart: timestart,
        timeend: timeend,
        description:description
    }).then(function(user) {
        callback(true);
    }).error(function(err) {
        callback(false);
    });
}


 