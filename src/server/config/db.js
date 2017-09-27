'use strict';

var Mongoose = require('mongoose');
Mongoose.Promise = global.Promise;
Mongoose.connect('mongodb://localhost:27017/agentcloud'); 

var db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
  console.log('Connection with database succeeded.');
});

exports.db = db;