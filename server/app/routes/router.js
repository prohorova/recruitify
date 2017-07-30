var authController = require('../controllers/auth.controller');
var errorHandler = require('../utils/errorHandler');

module.exports = function(app) {

  // user

  app.post('/api/login', authController.validateLogin, authController.login);

  app.post('/api/register', authController.validateRegister, authController.register);

  app.post('/api/confirm', authController.confirm);

  //app.post('/api/resend');

  // error handler

  app.use(errorHandler);

};
