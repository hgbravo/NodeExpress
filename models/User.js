/**
 * Created by henrybravo on 10/28/16.
 */
"use strict";

let mongoose = require('mongoose');

// User Schema definition
let userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
});

userSchema.statics.findUser = function (filter, cb) {
    let query = User.find(filter);

    query.exec(cb);

};

var User = mongoose.model('User', userSchema);