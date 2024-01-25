const config = require("../../config");
const UserService = require("../users/service");


function AcessosService(AcessosModel) {
    let service = {
        create,
        findAll,
        findAcessById,
        update,
        deleteById,
        autorize,
        findAcessByUserId
    };

    function create(acesso) {
        return new Promise(function (resolve, reject) { // do a thing, possibly async, then…
            AcessosModel.create(acesso, function (err) {
                if (err) 
                    reject(err);
                


                resolve({message: 'Acess saved', acesso: acesso});
            });
        });
    }

    function update(id, acess) {
        console.log('acess', acess);
        return new Promise(function (resolve, reject) {
            console.log('acess', acess);
            AcessosModel.findByIdAndUpdate(id, acess, function (err, acessUpdated) {
                if (err) 
                    reject('Dont updated Acess');
                


                resolve(acessUpdated);
            });
        });
    }

    function findAcessById(id) {
        return new Promise(function (resolve, reject) {
            AcessosModel.findById(id, function (err, acess) {
                if (err) 
                    reject(err);
                


                resolve(acess);
            });
        });
    }

    function findAcessByUserId(userId) {
        return new Promise(function (resolve, reject) {
            var ObjectId = require('mongoose').Types.ObjectId;
            var query = {
                Users: ObjectId(userId)
            };
            console.log(query);
            AcessosModel.find({
                query
            }, function (err, acess) {

                if (err) 
                    reject(err);
                


                resolve(acess);
            });
        });
    }

    function findAll(pagination) {
        const {limit, skip} = pagination;

        return new Promise(function (resolve, reject) {
            AcessosModel.find({}, {}, {
                skip,
                limit
            }, function (err, acess) {
                if (err) 
                    reject(err);
                


                resolve(acess);
            });
        }).then(async (acess) => {
            const totalPlayers = await AcessosModel.count();

            return Promise.resolve({
                data: acess,
                pagination: {
                    pageSize: limit,
                    page: Math.floor(skip / limit),
                    hasMore: skip + limit < totalPlayers,
                    total: totalPlayers
                }
            });
        });
    }
    function deleteById(id) {
        return new Promise(function (resolve, reject) {
            console.log(id);
            AcessosModel.deleteOne({
                _id: id

            }, function (err, acess) {
                if (err) 
                    reject(err);
                


                resolve(acess);
            });
        });

    }
    function autorize(user_1) {
      console.log("Chegaram os dados do user."+user_1);
      var query = {
        email: "",
    };
    if (user_1.local=="entrada"){
        var query = {
            email: user_1.email,
        };
     }
  
            return new Promise(function (resolve, reject) {
                UserService.findOne({
                    query
                }, function (err, user) {
                    console.log("Devolvi os dados user"+user_1)
                    if (err) 
                        reject(err);
                    
                    // object of all users
    
                    if (! user) {
                        reject("This data is wrong");
                    }
                    resolve(user);
                });
            })
    
              
            
        
    
    }
    return service;
}

module.exports = AcessosService;
