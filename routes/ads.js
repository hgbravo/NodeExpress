"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Ad = mongoose.model('Ad');

var jwtAuth = require('../lib/jwtAuth');

router.use(jwtAuth());

router.get('/', function (req, res, next) {

    let name = req.query.name;
    let onSale = req.query.onSale;
    let priceTemp = req.query.price;
    let price;
    let tags = req.query.tags;
    let includeTotal = req.query.includeTotal;

    let sort = req.query.sort || null;
    let limit = parseInt(req.query.limit) || null;
    let start = parseInt(req.query.start) || 0;

    let filter = {};

    if (typeof priceTemp !== 'undefined') {

        if (priceTemp.startsWith('-')) {

            price = {'$lte': priceTemp.substr(1)};
        } else {

            if (priceTemp.endsWith('-')) {

                price = {'$gte': priceTemp.substr(0, priceTemp.length - 1)};
            } else {

                let n = priceTemp.search('-');
                if  (n !== -1) {

                    price = {'$gte': priceTemp.substr(0, n), '$lte': priceTemp.substr(n + 1, priceTemp.length)};
                } else {

                    price = priceTemp;
                }
            }
        }
    }

    if (typeof tags !== 'undefined') {

        tags = {'$all': tags};
        filter.tags = tags;
    }

    if (typeof price !== 'undefined') {

        filter.price = price;
    }

    if (typeof name !== 'undefined') {

        name = new RegExp('^' + name, "i");
        filter.name = name;
    }

    if (typeof onSale !== 'undefined') {

        filter.onSale = onSale;
    }
    console.log('filter', filter);

    Ad.showAdsWithOptions(filter, sort, limit, start, function (err, ads) {

        if (err) {

            next(err);
            return;
        }

        if (ads.length === 0) {

            console.log('No ad with this criteria');
            res.json({success: false, ads: 'No ads found'});
        } else {
            
            if (includeTotal === 'true') {
                res.json({success: true, ads: ads, totalAds: ads.length});
            } else {
                res.json({success: true, ads: ads});
            }
        }
    })
});

module.exports = router;