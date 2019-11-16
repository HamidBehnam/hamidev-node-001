const VerifyUserMiddleware = require('../auth/middlewares/verify.user.middleware');
const AuthController = require('./controllers/auth.controller');

exports.routesConfig = (app) => {
    app.post('/auth', [
        //call the middleware to check and make sure the provided email and password match
        //call controller to handle the authentication process
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthController.login
    ]);

    app.post('/auth/refresh_token', [
        // call the middleware to check and make sure the provided refresh_token is valid
        // then call the controller to
    ]);
};
