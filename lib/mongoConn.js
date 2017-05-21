/**
 * Created by henrybravo on 10/28/16.
 */
"use strict";

var mongoose = require('mongoose');
var myDB = mongoose.connection;

myDB.on('error', console.log.bind(console));

myDB.once('open', function () {
   console.log('Connected to MongoDB.')
});

mongoose.connect('mongodb://localhost:27017/nodeads');