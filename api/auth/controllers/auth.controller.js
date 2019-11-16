const config = require('../../common/config/env.config');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const refreshKey = req.body.id + config.jwt_secret;
    const refreshSalt = crypto.randomBytes(16).toString('base64');
    const refreshHash = crypto.createHmac('sha512', refreshSalt).update(refreshKey).digest('base64');
    const refreshHashCode = Buffer.from(refreshHash).toString('base64');

    const token = jwt.sign(req.body.tokenData, config.jwt_secret, {
        expiresIn: 600
    });

    req.body.refreshTokenData = {
        salt: refreshSalt,
        hash_code: refreshHashCode
    };

    const refreshToken = jwt.sign(req.body, config.jwt_secret, {
        expiresIn: '10d'
    });

    res.send({
        accessToken: token,
        refreshToken: refreshToken
    });
};
