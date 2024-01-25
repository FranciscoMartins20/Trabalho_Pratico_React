const bodyParser = require("body-parser");
const express = require("express");
const Aulas = require("../data/aulas");
const scopes = require("../data/users/scopes");
const Users = require("../data/users");
function AccessRouter() {
    let router = express();


    router.use(bodyParser.json({limit: "100mb"}));
    router.use(bodyParser.urlencoded({limit: "100mb", extended: true}));


    router.route("/").get(function (req, res, next) {
        console.log("GET ALL Aulas")
        const pageLimit = req.query.limit ? parseInt(req.query.limit) : 5;
        const pageSkip = req.query.skip ? pageLimit * parseInt(req.query.skip) : 0;

        req.pagination = {
            limit: pageLimit,
            skip: pageSkip
        };

        Aulas.findAll(req.pagination).then((aulas) => {

            const response = {
                auth: true,
                ...aulas
            };
            res.send(response);
            next();
        }).catch((err) => {
            console.log(err.message);
            next();
        });

    });
    router.route("/create").post(function (req, res, next) {
        const body = req.body;


        Aulas.create(body).then((aulas) => {
            res.status(200);
            res.send(aulas);
        }).catch((err) => {
            res.status(500);
            res.send(err);
            next();
        });
    });
    router.route("/delete/:id").delete(function (req, res, next) {
        const id = req.params.id;


        Aulas.delete(id).then((aulas) => {
            res.status(200);
            res.send(aulas);
        }).catch((err) => {
            res.status(500);
            res.send(err);
            next();
        });
    });

    router.route("/update/:id").put(function (req, res, next) {
        const id = req.params.id;
        const body = req.body;

        Aulas.update(id, body).then((aulas) => {
            res.status(200);
            res.send(aulas);
        }).catch((err) => {
            res.status(500);
            res.send(err);
            next();
        });
    });

    router.route("/:id").get(function (req, res, next) {
        const id = req.params.id;

        Aulas.findAulaById(id).then((aulas) => {
            res.status(200);
            res.send(aulas);
        }).catch((err) => {
            res.status(500);
            res.send(err);
            next();
        });
    });

    // router.route("/subscribe/:id").post(function (req, res, next) {
    //     const id = req.params.id;
    //     const userId = req.body.userId;
    //     Aulas.inscribe(id, userId).then((aulas) => {
    //         res.status(200);
    //         res.send(aulas);
    //     }).catch((err) => {
    //         res.status(500);
    //         res.send(err);
    //         next();
    //     });
    // });

    // router.route("/subscribe/:id").delete(function (req, res, next) {
    //     const id = req.params.id;
    //     const userId = req.body.userId;

    //     Aulas.uninscribe(id, userId).then((aulas) => {
    //         res.status(200);
    //         res.send(aulas);
    //     }).catch((err) => {
    //         res.status(500);
    //         res.send(err);
    //         next();
    //     });
    // });


    // router.route("/getsubs/:id").get(function (req, res, next) {
    //     const id = req.params.id;
    //     console.log("buscar as subs");
    //     Aulas.findAulaById(id).then((aulas) => {
    //         const inscricoes = aulas.inscricoes.map(inscricao => inscricao.usuario);
    //         res.status(200);
    //         res.send(inscricoes);
    //     }).catch((err) => {
    //         res.status(500);
    //         res.send(err);
    //         next();
    //     });
    // });


    return router;
}

module.exports = AccessRouter;
