const bodyParser = require("body-parser");
const express = require("express");
const Users = require("../data/users");
const scopes = require("../data/users/scopes");
const VerifyToken = require("../middleware/Token");
const Upload = require("../middleware/upload");
const cookieParser = require("cookie-parser");

const UsersRouter = (io) => {
    let router = express();

    router.use(bodyParser.json({limit: "100mb"}));
    router.use(bodyParser.urlencoded({limit: "100mb", extended: true}));
    router.route("/acessAutorize").post(function (req, res, next) {
        const body = req.body;
        console.log(body);


        Users.acessAutorize(body).then((users) => {
            console.log("Devolvi"+users);
            res.status(200);
            res.send(users);
        }).catch((err) => {
            res.status(500);
            res.send(err);
            next();
        });
    });
    router.use(cookieParser());
    router.use(VerifyToken);

    router.route("").post(function (req, res, next) {
        console.log("Create user");
        let body = req.body;
        let {role} = body;

        if (role.scope !== scopes.NotMember) {
            return res.status(401).send({auth: false, message: "Only create NonMembers"});
        }

        Users.create(body).then((user) => {
            io.sockets.emit('admin_notifications', {
                message: 'Add user',
                key: 'User'
            });
            res.status(200);
            res.send();
            next();
        }).catch((err) => {
            console.log("erro", err);
            res.status(404);
            next();
        });
    }).get(function (req, res, next) {
        console.log("get all users");

        const pageLimit = req.query.limit ? parseInt(req.query.limit) : 5;
        const pageSkip = req.query.skip ? pageLimit * parseInt(req.query.skip) : 0;

        req.pagination = {
            limit: pageLimit,
            skip: pageSkip
        };

        Users.findAll(req.pagination).then((users) => {
            const response = {
                auth: true,
                ...users
            };
            res.send(response);
            next();
        }).catch((err) => {
            console.log(err.message);
            next();
        });
    });

    router.route("/perfil").get(function (req, res, next) {
        console.log("get the perfil of user " + req.id);
        // the id is get when the token has decoded
        let userId = req.id;
        Users.findUserById(userId).then((user) => {
            res.status(200);
            res.send({data: user});
            next();
        }).catch((err) => {
            console.log("Perfil", err);
            res.status(404);
            next();
        });
    });

    router.route("/:userId").put( function (req, res, next) {
        console.log("update a member by id");
        let userId = req.params.userId;
        let body = req.body;

        Users.update(userId, body).then((user) => {
            res.status(200);
            res.send(user);
            next();
        }).catch((err) => {
            res.status(404);
            next();
        });
    });

    router.route("/:userId/member").post(Users.autorize([scopes.Admin, scopes.Trainer, scopes.Gestor,scopes.NotMember]), function (req, res, next) {
        let userId = req.params.userId;
        let update = {
            role: {
                name: "Member",
                scope: "member"
            }
        }
    
        Upload(req, next)
            .then((path) => {
                update.photo = path;
                return Users.update(userId, update);
            })
            .then((user) => {
                res.status(200);
                res.send(user);
                next();
            })
            .catch((err) => {
                console.log(err);
                err.status = err.status || 500;
                res.status(401);
                next();
            });
    });
    

    router.route("/member").get(Users.autorize([
        scopes.Admin,
        scopes.Member,
        scopes.Gestor,
        scopes.MemberVIP,
        scopes.Trainer
    ]), function (req, res, next) {
        console.log("get all tickets");

        const pageLimit = req.query.limit ? parseInt(req.query.limit) : 5;
        const pageSkip = req.query.skip ? pageLimit * parseInt(req.query.skip) : 0;

        req.pagination = {
            limit: pageLimit,
            skip: pageSkip
        };

        Members.findAll(req.pagination).then((members) => {
            const response = {
                auth: true,
                members: members
            };
            res.send(response);
            next();
        }).catch((err) => {
            console.log(err.message);
            next();
        });
    });

    router.route("/member/:memberId").get(function (req, res, next) {
        let memberId = req.params.memberId;

        Users.findUserById(memberId).then((member) => {
            console.logo("TOU AQUI !");
            res.status(200);
            res.send(member);
            next();
        }).catch((err) => {
            res.status(404);
            next();
        });
    }).put(function (req, res, next) {
        console.log("update a member by id");
        let memberId = req.params.memberId;
        let body = req.body;

        Users.update(memberId, body).then((member) => {
            res.status(200);
            res.send(member);
            next();
        }).catch((err) => {
            res.status(404);
            next();
        });
    });


    router.route("/listall").get(function (req, res, next) {
        console.log("get all users");

        const pageLimit = req.query.limit ? parseInt(req.query.limit) : 5;
        const pageSkip = req.query.skip ? pageLimit * parseInt(req.query.skip) : 0;

        req.pagination = {
            limit: pageLimit,
            skip: pageSkip
        };

        Users.findAll(req.pagination).then((users) => {
            const response = {
                auth: true,
                ...users
            };
            res.send(response);
            next();
        }).catch((err) => {
            console.log(err.message);
            next();
        });
    });

  
    return router;
};

module.exports = UsersRouter;
