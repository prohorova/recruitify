var authController = require('../controllers/auth.controller');
var invitationsController = require('../controllers/invitations.controller');
var questionsController = require('../controllers/questions.controller');
var feedbackController = require('../controllers/feedbacks.controller');
var errorHandler = require('../utils/errorHandler');

module.exports = function(app) {

  // auth

  app.post('/api/login', authController.validateLogin, authController.login);

  app.post('/api/register', authController.validateRegister, authController.register);

  app.post('/api/confirm', authController.confirm);

  // invitations

  app.post('/api/invitation', authController.hasAccess, invitationsController.inviteCustomer);

  // questions

  app.get('/api/questions', questionsController.getQuestions);

  // feedback

  app.get('/api/feedback', authController.hasAccess, feedbackController.listFeedbacks);

  app.post('/api/feedback', feedbackController.createFeedback);

  // error handler

  app.use(errorHandler);

};
