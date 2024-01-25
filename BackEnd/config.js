const config = {
    db: 'mongodb://127.0.0.1:27017/gym_estg',
    secret: 'supersecret',
    expiresPassword: 86400, // expires in 24hours
    saltRounds: 10
}

module.exports = config;
