/**
 * Created by henrybravo on 10/28/16.
 */
"use strict";

let mongoose = require('mongoose');

// Ad Schema definition
let adSchema = mongoose.Schema({
    name: String,
    onSale: Boolean,
    price: Number,
    image: String,
    tags: [String]
});

adSchema.statics.showAdsWithOptions = function (filter, sort, limit, skip, cb) {
    let query = Ad.find(filter);

    query.sort(sort);
    query.limit(limit);
    query.skip(skip);
    query.exec(cb);
};

var Ad = mongoose.model('Ad', adSchema);
