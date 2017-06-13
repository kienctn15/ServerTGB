var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql=require('mysql');
var ip = require("ip");


var index = require('./routes/index');
var users = require('./routes/users');
var customersModels= require('./models-sequelize/customers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


//connect
customersModels.connect(require('./sequelize-params'),
    function(err) {
        if(err)
            throw err;
    });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var server = http.Server(app);
var io = require('socket.io').listen(server);
app.set('port', 3000);
 
server.listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});

console.dir ( ip.address() );

///////////////////////////////////////////////////////////////////////////

io.sockets.on('connection', function(socket) {

    
    socket.on('save_time_table',function(jsonObject){
      customersModels.findByUsername(jsonObject.user,function(result){
        if(result){
          customersModels.customer_save_timetable(jsonObject.username,jsonObject.title,jsonObject.address,jsonObject.date,jsonObject.timestart,jsonObject.timeend,jsonObject.description,function(result1){
            socket.emit('result_save',{result1:result1});
          });
        }else{
          socket.emit('result_save',{result1:result1});
        }
      });
    }); 
    

});
