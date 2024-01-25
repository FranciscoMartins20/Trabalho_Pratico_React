const bodyParser = require("body-parser");
const express = require("express");
const Acess = require("../data/acessos");
const scopes = require("../data/users/scopes");
const User = require("../data/users");

function AccessRouter() {
    let router = express();

    // router.use(VerifyToken); // Adicionar esta verificação
    router.use(bodyParser.json({limit: "100mb"}));
    router.use(bodyParser.urlencoded({limit: "100mb", extended: true}));


    router.route("/").get(function (req, res, next) {
        console.log("GET ALL Access")
        const pageLimit = req.query.limit ? parseInt(req.query.limit) : 5;
        const pageSkip = req.query.skip ? pageLimit * parseInt(req.query.skip) : 0;

        req.pagination = {
            limit: pageLimit,
            skip: pageSkip
        };

        Acess.findAll(req.pagination).then((acess) => {

            const response = {
                auth: true,
               ...acess
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


        Acess.create(body).then((acess) => {
            res.status(200);
            res.send(acess);
        }).catch((err) => {
            res.status(500);
            res.send(err);
            next();
        });
    });

    router.route("/delete/:id").delete(function (req, res, next) {
        const id = req.params.id;

        Acess.deleteById(id).then((acess) => {
            res.status(200);
            res.send(acess);
        }).catch((err) => {
            res.status(500);
            res.send(err);

            next();
        });
    });

    router.route("/:id").get(function (req, res, next) {
        const id = req.params.id;

        Acess.findAcessByUserId(id).then((acess) => {
            res.status(200);
            res.send(acess);
        }).catch((err) => {
            res.status(500);
            res.send(err);

            next();
        });
    });

   

    return router;
}

module.exports = AccessRouter;
