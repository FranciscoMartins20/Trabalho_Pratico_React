const config = require("../../config");
const {remove} = require("./aulas");


function AulasService(AulaModel) {
    let service = {
        create,
        findAll,
        findAulaById,
        update,
        deleteById,
        update,
        inscribe,
        uninscribe,
        getInscriptions


    };

    function create(aula) {
        return new Promise(function (resolve, reject) { // do a thing, possibly async, then…
            AulaModel.create(aula, function (err) {
                if (err) 
                    reject(err);
                


                resolve({message: 'Aula saved', aula: aula});
            });
        });
    }


    function update(id, aula) {
        console.log('aula', aula);
        return new Promise(function (resolve, reject) {
            console.log('aula', aula);
            AulaModel.findByIdAndUpdate(id, aula, function (err, aulaUpdated) {
                if (err) 
                    reject('Dont updated Aula');
                


                resolve(aulaUpdated);
            });
        });
    }

    function findAulaById(id) {

        return new Promise(function (resolve, reject) {
            AulaModel.findById(id, function (err, aula) {
                if (err) 
                    reject(err);
                


                resolve(aula);
            });
        });
    }


    function findAll(pagination) {
        const {limit, skip} = pagination;

        return new Promise(function (resolve, reject) {
            AulaModel.find({}, {}, {
                skip,
                limit
            }, function (err, aula) {
                if (err) 
                    reject(err);
                


                resolve(aula);
            });
        }).then(async (aula) => {
            const totalPlayers = await AulaModel.count();

            return Promise.resolve({
                data: aula,
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

            AulaModel.deleteOne({
                _id: id
            }, function (err, aula) {
                if (err) 
                    reject(err);
                


                resolve(aula);
            });
        });
    }

    function update(id, aula) {
        console.log('aula', aula);
        return new Promise(function (resolve, reject) {
            console.log('aula', aula);
            AulaModel.updateOne(id, aula, function (err, aulaUpdated) {
                if (err) 
                    reject('Dont updated aula');
                

                resolve(aulaUpdated);
            });
        });
    }
    function inscribe(id, userId) {
        return new Promise(function (resolve, reject) {
            AulaModel.findByIdAndUpdate(id, null, function (err, aulaUpdated) {
                 console.log(id);
                 if (err) 
                     reject(err);
                 
                 var elementAdd = {usuario: userId, data: Date.now};
                 aulaUpdated.inscricoes.push(elementAdd);
                 console.log(aulaUpdated);
                 resolve(aulaUpdated);
            });
        });
    }

    function uninscribe(id, userId) {
        return new Promise(function (resolve, reject) {
            AulaModel.findByIdAndUpdate(id, {
                $pull: {
                    inscricoes: userId
                }
            }, function (err, aula) {
                if (err) 
                    reject(err);
                
                resolve(aula);
            });
        });
    }

    function getInscriptions(id) {
        return new Promise(function (resolve, reject) {
            AulaModel.findById(id, {
                inscricoes: 1
            }, function (err, aula) {
                if (err) 
                    reject(err);
                
                resolve(aula);
            });
        });
    }

    return service;
}

module.exports = AulasService;
