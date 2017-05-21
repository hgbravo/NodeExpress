var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt');
const saltRounds = 10;

var mongoose = require('mongoose');
var User = mongoose.model('User');

var jwt = require('jsonwebtoken');

// GET users listing.
router.get('/', function(req, res, next) {

  User.find(function (err, users) {

    if (err) {

      next(err);
      return;
    }

    res.json({success: true, users: users});
  });
});

// Create a login to authenticate user
router.post('/authenticate', function (req, res, next) {

  let email = req.body.email;
  let password = req.body.password;
  let token;

  let filter = {};

  if (typeof email !== 'undefined') {

    filter.email = email;
  }

  if (typeof password !== 'undefined') {

    User.findUser(filter, function (err, user) {
      if (err) {
        next(err);
        return;
      }

      if (user.length === 0) {

        console.log('User not found.');
        res.json({success: false, msg: 'User not found'});
      } else {

        let hash = user[0].password;

        bcrypt.compare(password, hash, function(err, result) {

          if (result) {

            token = jwt.sign({id: user._id}, 'hbttobkbgbhbsm', {
              expiresIn: '2 days'
            });
            res.json({success: true, msg: 'User authenticated', token: token});

          } else {
            console.log('User found but not authenticated.');
            res.json({success: false, msg: 'User not authenticated'});
          }
        });
      }

    });
  }

});

// Create an user with a hashed password.
router.post('/', function (req, res, next) {
  var user = new User(req.body);
  console.log(user.password);
  bcrypt.hash(user.password, saltRounds, function(err, hash) {

    user.password = hash;
    user.save(function (err, userSaved) {
      if (err) {
        next(err);
        return;
      }

      res.json({success: true});
    });
  });

});

module.exports = router;
