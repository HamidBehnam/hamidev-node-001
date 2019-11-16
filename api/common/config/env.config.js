module.exports = {
    port: 4000,
    databaseUrl: "mongodb://localhost/hamidev001",
    databaseConfig: {
        autoIndex: false,
        reconnectTries: 30,
        reconnectInterval: 500,
        poolSize: 10,
        bufferMaxEntries: 0
    },
    jwt_secret: "myS33!!creeeT",
    permissions: {
        FREE_USER: 100,
        PAID_USER: 200,
        ADMIN: 300
    }
};
