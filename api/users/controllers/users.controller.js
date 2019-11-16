const UsersModel = require('../models/users.model');
const crypto = require('crypto');
const config = require('../../common/config/env.config');

const processPassword = (rawPassword) => {
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512', salt).update(rawPassword).digest('base64');
    return salt + '$' + hash;
};

exports.create = (req, res) => {
    req.body.password = processPassword(req.body.password);
    req.body.permissionLevel = config.permissions.FREE_USER;
    UsersModel.create(req.body)
        .then(result => res.status(201).send(result));
};

exports.findById = (req, res) => {
    //removing the res.status means sending the default status code
    UsersModel.findById(req.params.userId)
        .then(result => res.send(result))
        .catch(error => res.status(404).send({message: `Couldn't find the user`}));
};

exports.findByIdAndUpdate = (req, res) => {
    if (req.body.permissionLevel) {
        if (req.jwt.permissionLevel !== config.permissions.ADMIN) {
            return res.status(401).send();
        }
    }

    if (req.body.password) {
        req.body.password = processPassword(req.body.password)
    }

    UsersModel.findByIdAndUpdate(req.params.userId, req.body)
        .then(result => res.send(result))
        .catch(error => res.status(404).send({message: `Couldn't find the user`}));
};

exports.findAll = (req, res) => {
    // you don't need to manually convert to number before comparing to the numbers, it'll be converted automatically
    const limit = req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    const page = req.query.page > 0 ? parseInt(req.query.page) : 1;

    UsersModel.findAll(limit, page)
        .then(result => res.send(result));
};

exports.findByIdAndDelete = (req, res) => {
    UsersModel.findByIdAndDelete(req.params.userId)
        .then(() => res.send({ message: `You've successfully deleted the user!` }))
        .catch(error => res.status(404).send({ message: `Couldn't delete the user, wrong id.` }));
};
