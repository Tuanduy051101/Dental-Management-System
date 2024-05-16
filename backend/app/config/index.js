const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        uri: process.env.MONGDB_URI || "mongodb://localhost:27017/clinic_manager",
    },
}

module.exports = config;