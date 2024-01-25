const bodyParser = require("body-parser");
const express = require("express");
const Users = require("../data/users");
const cookieParser = require('cookie-parser');
const VerifyToken = require('../middleware/Token');

function AuthRouter() {
    let router = express();
    router.use(bodyParser.json({limit: "100mb"}));
    router.use(bodyParser.urlencoded({limit: "100mb", extended: true}));
    router.route("/register").post(function (req, res, next) {
        const body = req.body;

        const {role} = body;


        Users.create(body).then(() => Users.createToken(body)).then((response) => {
            res.status(200);
            res.send(response);
        }).catch((err) => {
            res.status(500);
            res.send(err);
            next();
        });
    });

    router.route("/login").post(function (req, res, next) {
        let body = req.body;

        return Users.findUser(body).then((user) => {
            return Users.createToken(user);
        }).then((response) => {
            console.log('response', response)
            // The httpOnly: true setting means that the cookie can’t be read using JavaScript but can still be sent back to the server in HTTP requests
            res.cookie("token", response.token, {httpOnly: true});
            res.status(200);
            res.send(response);
        }).catch((err) => {
            console.log('error', err);
            res.status(500);
            res.send(err);
        });
    });

    router.use(cookieParser()); // Adicionar esta verificação
    router.use(VerifyToken); // Adicionar esta verificação

    router.route("/logout").get(function (req, res, next) {
        // The httpOnly: true setting means that the cookie can’t be read using JavaScript but can still be sent back to the server in HTTP requests
        // MaxAge : It allows us to invalidate the cookie
        res.cookie("token", req.cookies.token, {
            httpOnly: true,
            maxAge: 0
        });

        res.status(200);
        res.send({logout: true});
        next();
    });

    router.route("/me").get(function (req, res, next) {
        console.log("Pedido de rota me");
        return new Promise(() => {
            console.log(req.roleUser);
            res.status(202).send({auth: true, decoded: req.roleUser});
        }).catch((err) => {
            res.status(500);
            res.send(err);
            next();
        });
    });

    router.route("/me/admin").get(function (req, res, next) {
        console.log("Pedido de rota admin");
        return new Promise(() => {
            if (req.roleUser == "admin") {
                console.log(req.roleUser);
                res.status(202).send({auth: true, decoded: req.roleUser});
            } else {
                res.status(202).send({auth: false, decoded: req.roleUser});
            }

        }).catch((err) => {
            res.status(500);
            res.send(err);
            next();
        });

    });
    router.route("/who").get(function (req, res, next) {
        let token = req.cookies.token;
        console.log(token);

        Users.verifyToken(token).then((decoded) => {
            res.send(decoded);
            next();
        }).catch(() => {
            res.status(401).send({auth: false, message: "Not authorized"});
        });
    });

    router.route("/me/gestor").get(function (req, res, next) {
        console.log("Pedido de rota gestor");
        return new Promise(() => {
            if (req.roleUser == "gestor") {
                console.log(req.roleUser);
                res.status(202).send({auth: true, decoded: req.roleUser});
            } else {
                res.status(202).send({auth: false, decoded: req.roleUser});
            }

        }).catch((err) => {
            res.status(500);
            res.send(err);
            next();
        });

    });

    router.route("/me/member").get(function (req, res, next) {
        console.log("Pedido de rota member");
        return new Promise(() => {
            if (req.roleUser == "member") {
                console.log(req.roleUser);
                res.status(202).send({auth: true, decoded: req.roleUser});
            } else {
                res.status(202).send({auth: false, decoded: req.roleUser});
            }

        }).catch((err) => {
            res.status(500);
            res.send(err);
            next();
        });

    });

    router.route("/me/membervip").get(function (req, res, next) {
        console.log("Pedido de rota membervip");
        return new Promise(() => {
            if (req.roleUser == "membervip") {
                console.log(req.roleUser);
                res.status(202).send({auth: true, decoded: req.roleUser});
            } else {
                res.status(202).send({auth: false, decoded: req.roleUser});
            }

        }).catch((err) => {
            res.status(500);
            res.send(err);
            next();
        });

    });

    router.route("/me/trainer").get(function (req, res, next) {
        console.log("Pedido de rota trainer");
        return new Promise(() => {
            if (req.roleUser == "trainer") {
                console.log(req.roleUser);
                res.status(202).send({auth: true, decoded: req.roleUser});
            } else {
                res.status(202).send({auth: false, decoded: req.roleUser});
            }

        }).catch((err) => {
            res.status(500);
            res.send(err);
            next();
        });

    });


    router.route("/me/adminGestor").get(function (req, res, next) {
        console.log("Pedido de rota Admin e Gestor");
        return new Promise(() => {
            if (req.roleUser == "admin" || req.roleUser == "gestor") {
                console.log(req.roleUser);
                res.status(202).send({auth: true, decoded: req.roleUser});
            } else {
                res.status(202).send({auth: false, decoded: req.roleUser});
            }

        }).catch((err) => {
            res.status(500);
            res.send(err);
            next();
        });

    });
    router.route("/me/adminGestorTrainer").get(function (req, res, next) {
        console.log("Pedido de rota Admin e Gestor e Trainer");
        return new Promise(() => {
            if (req.roleUser == "admin" || req.roleUser == "gestor" || req.roleUser == "trainer") {
                console.log(roleUser);
                res.status(202).send({auth: true, decoded: req.roleUser});
            } else {
                res.status(202).send({auth: false, decoded: req.roleUser});
            }

        }).catch((err) => {
            res.status(500);
            res.send(err);
            next();
        });

    });

    router.route("/me/adminGestorTrainerVIP").get(function (req, res, next) {
        console.log("Pedido de rota Admin e Gestor");
        return new Promise(() => {
            if (req.roleUser == "admin" || req.roleUser == "gestor" || req.roleUser == "trainer" || req.roleUser == "membervip") {
                console.log(req.roleUser);
                res.status(202).send({auth: true, decoded: req.roleUser});
            } else {
                res.status(202).send({auth: false, decoded: req.roleUser});
            }

        }).catch((err) => {
            res.status(500);
            res.send(err);
            next();
        });

    });

    router.route("/me/adminGestorTrainerVIPMember").get(function (req, res, next) {
        console.log("Pedido de rota Admin e Gestor");
        return new Promise(() => {
            if (req.roleUser == "admin" || req.roleUser == "gestor" || req.roleUser == "trainer" || req.roleUser == "membervip" || req.roleUser == "member") {
                console.log(req.roleUser);
                res.status(202).send({auth: true, decoded: req.roleUser});
            } else {
                res.status(202).send({auth: false, decoded: req.roleUser});
            }

        }).catch((err) => {
            res.status(500);
            res.send(err);
            next();
        });

    });

    return router;
}

module.exports = AuthRouter;
