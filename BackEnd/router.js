let AuthAPI = require('./server/auth');
let UsersAPI = require('./server/users');
const AulasRoutes = require('./server/aulas');
const AcessosRoutes = require('./server/acessos');
const PresencaRoutes = require('./server/presencas');
const express = require('express');

function init(io) {
    let api = express();
    api.use('/presenca',PresencaRoutes())
    api.use('/auth', AuthAPI());
    api.use('/users', UsersAPI(io));
    api.use('/aulas', AulasRoutes());
    api.use('/acessos', AcessosRoutes());

    return api;
}

module.exports = {
    init: init
}
