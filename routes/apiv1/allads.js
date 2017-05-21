/**
 * Created by henrybravo on 10/28/16.
 */
"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Ad = mongoose.model('Ad');

router.get('/', function (req, res, next) {

    Ad.find().exec(function (err, ads) {

        if (err) {
            next(err);
            return;
        }

        res.json({success: true, ads: ads});
    })
});

module.exports = router;