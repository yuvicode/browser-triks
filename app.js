var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
app.get('/server/slow-script.js',function (req,res,next) {
  sleep(12000).then( () => {res.send('scripLoaded()')})
})

const statistics = []
app.post('/get-report',function (req,res,next) {
  if(req.body){
    req.body.forEach( item => statistics.push(item))
  }
})



module.exports = app;
