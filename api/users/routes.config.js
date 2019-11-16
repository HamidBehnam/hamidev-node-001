const UsersController = require('./controllers/users.controller');
const AuthValidation = require('../common/middlewares/auth.validation.middleware');
const AuthPermission = require('../common/middlewares/auth.permission.middleware');
const config = require('../common/config/env.config');

exports.routesConfig = (app) => {
    app.post('/users', [
        UsersController.create
    ]);

    app.get('/users', [
        AuthValidation.validJWTNeeded,
        AuthPermission.minimumPermissionLevelRequired(
            config.permissions.ADMIN,
            config.permissions.PAID_USER),
        UsersController.findAll
    ]);

    app.get('/users/:userId', [
        AuthValidation.validJWTNeeded,
        AuthPermission.onlySameUserOrAdminCanDoThisAction,
        UsersController.findById
    ]);

    app.patch('/users/:userId', [
        AuthValidation.validJWTNeeded,
        UsersController.findByIdAndUpdate
    ]);

    app.delete('/users/:userId', [
        AuthValidation.validJWTNeeded,
        AuthPermission.onlySameUserCanDoThisAction,
        UsersController.findByIdAndDelete
    ]);
};
