const UsersModel = require('../../users/models/users.model');
const crypto = require('crypto');

exports.isPasswordAndUserMatch = (req, res, next) => {
    //call the model and get the user based on the provided username or email
    UsersModel.findByEmail(req.body.email)
        .then((result) => {
            if (!result) {
                res.status(404).send({message: "User not found!"})
            } else {
                const [salt, hash] = result.password.split('$');
                const regeneratedHash = crypto.createHmac('sha512', salt)
                    .update(req.body.password).digest('base64');

                if (hash === regeneratedHash) {
                    req.body.tokenData = {
                        // TODO: the reason for not adding the entire found user in the JWT is because by relying on
                        //  userData stored in JWT we might get some outdated data, for instance if the user will change
                        //  their email address, later on by using req.jwt.email and we'll be getting the outdated data.
                        // userId: result.id,

                        ...result.toJSON(),
                        staticField: "some static information!"
                    };

                    return next()
                } else {
                    return res.status(400).send({errors: ["NOT OK"]});
                }
            }
        });
};
