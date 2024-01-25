const { application } = require("express");
const express = require("express");
const Presenca = require("../data/presencas");
const bodyParser = require("body-parser");
function PresencaRoutes() {
    const router = express.Router();
    
    router.use(bodyParser.json({ limit: "100mb" }));
    router.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

    router.route("/").get((req, res,next) => {
        console.log("GET ALL Presencas")
        const pageLimit = req.query.limit ? parseInt(req.query.limit) : 5;
        const pageSkip = req.query.skip ? pageLimit * parseInt(req.query.skip) : 0;

        req.pagination = {
            limit: pageLimit,
            skip: pageSkip
        };

        Presenca.findAll(req.pagination).then((presenca) => {

            const response = {
                auth: true,
                ...presenca
            };
            res.send(response);
            next();
        }).catch((err) => {
            console.log(err.message);
            next();
        });

    });

    router.route("/").post((req, res) => {
        console.log("Post presenca")
        let body = req.body;
        console.log(body);
        
        Presenca.create(body).then(createdPresenca => {
            res.status(201).json(createdPresenca);
        }).catch(err => {
            console.log("ERRO"+err.message);
            res.status(500).json({ message: err });
        });
    });

    router.route("/:id").delete((req, res) => {
        console.log("Fiz Delete");
        const id = req.params.id;
        console.log(id);
        Presenca.deleteById(id).then(() => {
            res.status(200).json({ message: "Presença apagada com sucesso" });
        }).catch(err => {
            res.status(500).json({ message: err });
        });
    });

    return router;
}

module.exports = PresencaRoutes;
