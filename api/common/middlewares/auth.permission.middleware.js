const config = require('../config/env.config');

exports.minimumPermissionLevelRequired = (...requiredPermissionLevels) => {
    const isAllowed = permissionLevel => requiredPermissionLevels.indexOf(permissionLevel) !== -1;

    return (req, res, next) => {
        if (isAllowed(req.jwt.permissionLevel)) {
            next();
        } else {
            res.status(403).send({message: "Forbidden"});
        }
    };
};

exports.onlySameUserOrAdminCanDoThisAction = (req, res, next) => {
    if (req.params && req.params.userId && req.params.userId === req.jwt.id) {
        next();
    } else if (req.jwt.permissionLevel === config.permissions.ADMIN) {
        next();
    } else {
        res.status(403).send({message: "Forbidden"});
    }
};

exports.onlySameUserCanDoThisAction = (req, res, next) => {
    if (req.params && req.params.userId && req.params.userId === req.jwt.id) {
        next();
    } else {
        res.status(403).send({message: "Forbidden"});
    }
};
