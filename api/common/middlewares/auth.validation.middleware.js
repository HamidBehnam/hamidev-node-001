const jwt = require('jsonwebtoken');
const config = require('../config/env.config');

exports.validJWTNeeded = (req, res, next) => {
    if (req.headers.authorization) {
        try {
            const [identifier, token] = req.headers.authorization.split(' ');
            if (identifier !== 'Bearer') {
                return res.status(400).send({});
            } else {
                req.jwt = jwt.verify(token, config.jwt_secret);

                return next();
            }
        } catch {
            res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
};
