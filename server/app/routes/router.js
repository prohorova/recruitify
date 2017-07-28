var authController = require('../controllers/auth.controller');

module.exports = function(app) {

  app.post('/api/login', authController.validateLogin, authController.login);

  app.post('/api/register', authController.validateRegister, authController.register);

  app.post('/api/confirm');

  app.post('/api/resend');

};
