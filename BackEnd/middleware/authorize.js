const jwt = require('jsonwebtoken');
const config = require('../config');
const scopes = require('../data/users/scopes');

module.exports = (allowedScopes) => {
    return(req, res, next) => {
        const token = req.headers['x-access-token'];
        if (! token) {
            return res.status(401).send({auth: false, message: 'No token provided'});
        }

        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({auth: false, message: 'Failed to authenticate token'});
            }

            // Check if the user has the required scope
            if (allowedScopes.indexOf(decoded.role.scope) === -1) {
                return res.status(401).send({auth: false, message: 'Unauthorized'});
            }

            // If everything is good, save the request for use in other routes
            req.id = decoded.id;
            next();
        });
    };
};
