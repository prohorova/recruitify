var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var _ = require('lodash');
var User = require('../models/user.model');
var Token = require('../models/token.model');
var config = require('../../config/config');

exports.login = function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({email: email}, function(err, user) {
    if (err) return next(err);
    if (!user) return res.status(400).send({message: 'User doesn\'t exist'});
    if (!user.isVerified) return res.status(400).send({message: 'User is not verified'});
    if (!user.validPassword(password)) return res.status(400).send({message: 'Password is invalid'});

    var token = jwt.sign(user.toJSON(), config.jwtSecret, {
      expiresIn: 24*60*60
    });

    return res.send({token: token});
  })
};

exports.register = function(req, res, next) {
  var email = req.body.email;

  User.findOne({email: email}, function(err, user) {
    if (err) return next(err);
    if (user) {
      if (user.isVerified) {
        return res.status(400).send({message: 'User with this email already exists'});
      } else {
        // update user
        _.extend(user, req.body);
        user.setPasswordHash(user.password);

        user.save(function(err) {
          if (err) return next(err);

          var token = new Token({
            user: user,
            token: crypto.randomBytes(16).toString('hex')
          });

          token.save(function(err) {
            if (err) return next(err);

            // Send the email
            var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
            var mailOptions = { from: 'no-reply@example.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/auth\/confirm\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
              if (err) return res.status(500).send({ msg: err.message });
              return res.status(200).send({message: 'A verification email has been sent to ' + user.email});
            });
          })
        });
      }
    } else {
      var newUser = new User(req.body);
      newUser.setPasswordHash(newUser.password);
      newUser.save(function(err) {
        if (err) return next(err);

        var token = new Token({
          user: newUser,
          token: crypto.randomBytes(16).toString('hex')
        });

        token.save(function(err) {
          if (err) return next(err);

          // Send the email
          var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
          var mailOptions = { from: 'no-reply@example.com', to: newUser.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/auth\/confirm\/' + token.token + '.\n' };
          transporter.sendMail(mailOptions, function (err) {
            if (err) return res.status(500).send({ msg: err.message });
            return res.status(200).send({message: 'A verification email has been sent to ' + newUser.email});
          });
        })
      })
    }
  })
};

exports.confirm = function(req, res, next) {
  var tokenStr = req.body.token;
  Token.findOne({token: tokenStr}, function(err, token) {
    if (err) return next(err);
    if (!token) return res.status(400).send({message: 'Invalid token'});
    User.findOne({_id: token.user}, function(err, user) {
      if (err) return next(err);
      if (!user) return res.status(400).send({message: 'No user found'});
      if (user.isVerified) return res.status(400).send({message: 'User was already verified'});
      user.isVerified = true;
      user.save(function(err) {
        if (err) return next(err);
        return res.send({message: 'The account has been verified. You can login now'});
      })
    })
  })
};

exports.hasAccess = function(req, res, next) {
  var token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send({message: 'Not authenticated'});
  }
  token = token.replace('Bearer ', '');
  jwt.verify(token, config.jwtSecret, function(err, decoded) {
    if (err) return res.status(401).send({message: 'Failed to authenticate token'});
    req.decoded = decoded;
    return next();
  })
};

exports.validateLogin = function(req,res, next) {
  req.checkBody('email').notEmpty();
  req.checkBody('password').notEmpty();

  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      return res.status(400).send({message: result.array()[0].msg});
    }
    return next();
  })
};

exports.validateRegister = function(req,res, next) {
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is invalid').isEmail();
  req.checkBody('password', 'Passport is required').notEmpty();
  req.checkBody('password', 'Password should be at least 6 digits long').isLength({min: 6, max: undefined});

  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      return res.status(400).send({message: result.array()[0].msg});
    }
    return next();
  })
};
