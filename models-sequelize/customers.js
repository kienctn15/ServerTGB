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
        User= sequelize.define('Customers', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            username:Sequelize.STRING,
            idcv:Sequelize.STRING,
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

module.exports.findByIdcv = function(idcv, callback) {
    User.find({where: {idcv: idcv}}).then(function(user) {
        if(!user) {
            callback(true);
        } else {
            callback(false);
        } 
    });
}


module.exports.customer_save_timetable = function(username,idcv,title,address,date,timestart,timeend,description, callback) {
    User.create({
        id: '',
        username: username,
        idcv: idcv,
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

module.exports.customer_update_timetable = function(username,idcv,title,address,date,timestart,timeend,description, callback) {
    User.find({where: {username:username,idcv: idcv}}).then(function(user) {
        user.updateAttributes({
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
    });
}





exports.getAllCongViecByUsername = function(username, callback) { 
    User.findAll({where:{username: username}}).then(function(users) {
        var userList = []; 

        users.forEach(function(user) { 
            userList.push({
                username:user.username,
                idcv: user.idcv,
                title:user.title,
                address:user.address,
                date:user.date,
                timestart:user.timestart,
                timeend:user.timeend,
                description:user.description
            }); 
        });
        
        callback(userList);
    });
}

 