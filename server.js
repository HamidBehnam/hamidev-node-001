const express = require('express');
const bodyParser = require('body-parser');
const config = require('./api/common/config/env.config');
const UsersRouter = require('./api/users/routes.config');
const AuthRouter = require('./api/auth/routes.config');

const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json());
UsersRouter.routesConfig(app);
AuthRouter.routesConfig(app);

app.listen(config.port, () => {
    console.log(`app is running at port: ${config.port}`);
});
