var authController = require('../controllers/auth.controller');
var customersController = require('../controllers/customers.controller.js');
var questionsController = require('../controllers/questions.controller');
var feedbackController = require('../controllers/feedbacks.controller');
var errorHandler = require('../utils/errorHandler');

module.exports = function(app) {

  // auth

  app.post('/api/login', authController.validateLogin, authController.login);

  app.post('/api/register', authController.validateRegister, authController.register);

  app.post('/api/confirm', authController.confirm);

  // customers

  app.post('/api/customer', authController.hasAccess, customersController.create);

  app.get('/api/customer/:id', customersController.get);

  // questions

  app.get('/api/questions', questionsController.list);

  // feedback

  app.get('/api/feedback', authController.hasAccess, feedbackController.list);

  app.post('/api/feedback', feedbackController.create);

  // error handler

  app.use(errorHandler);

};
