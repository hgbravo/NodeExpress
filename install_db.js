/**
 * Created by henrybravo on 10/28/16.
 */
"use strict";

var fs = require('fs');
var mongoose = require('mongoose');

// Load models
require('./models/Ad');
require('./models/User');
var Ad = mongoose.model('Ad');
var User = mongoose.model('User');

// Make the connection to DB
var connPath = './lib/mongoConn';
makeConnection(connPath);

// Check if the collections have documents and erase them
cleanDB(Ad);
cleanDB(User);

// Read .json file
var loadInitData = function (dataFile, cb) {

    fs.readFile(dataFile, 'utf-8', function (err, data) {
        if (err) {
            return console.log('Error', err);
        }

        var initData = JSON.parse(data);
        cb(null, initData);
    });
};

// Load initial ads to DB ads collection
var adsFile = './initads.json';

loadInitData(adsFile, function (err, ads) {
    if (err) {
        return console.log('Error: ', err);
    }

    ads.ads.forEach(function (ad) {
        var newAd = new Ad(ad);

        newAd.save(function (err, adSaved) {
            if (err) {
                console.log("Error: ", err);
                return;
            }
        })
    });
    Ad.collection.createIndex({name:1, price:-1, onSale:1, tags:1});
    console.log('Ads collection initialized.');

});

User.collection.createIndex({name:1, email:1});

//mongoose.connection.close();


function makeConnection(path) {
    require(path);
}

function cleanDB(collection) {
    collection.find().count().exec(function (err, result) {
        if (err) {
            console.log('Error: ', err);
            return;
        }
        if (result !== 0 ) {
            collection.collection.drop(function (err) {
                console.log('Collection dropped.')
            });
        } else {
            console.log('It is an empty collection.');
        }
    })
}