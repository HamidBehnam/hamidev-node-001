const mongoose = require('mongoose');
const config = require('../config/env.config');

let count = 0;

const connectWithRetry = () => {
    console.log('MongoDB connection with retry');
    mongoose.connect(`${config.databaseUrl}`, config.databaseConfig)
        .then(() => console.log('Connected to MongoDB'))
        .catch(() => {
            console.log('MongoDB connection was unsuccessful, retry after 5 seconds. ', ++count);
            setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// this is to avoid mongoose to use the deprecated method: findAndModify()
// more info: https://mongoosejs.com/docs/deprecations.html#findandmodify
mongoose.set('useFindAndModify', false);

exports.mongoose = mongoose;
