const config = require("../../config");


const PresencaService = (PresencaModel) => {
    let service = {
    create,
    findAll,
    findPresencaById,
    update,
    deleteById
    };

    function create(presenca) {
        let novapresenca = PresencaModel(presenca)
       return save (novapresenca);
    }
    
    function update(id, presenca) {
        return new Promise((resolve, reject) => {
            PresencaModel.findByIdAndUpdate(id, presenca, function (err, presencaUpdated) {
                if (err) 
                    reject('Não foi possível atualizar a presença');
                
    
                resolve(presencaUpdated);
            });
        });
    }
    
    function findPresencaById(id) {
        return new Promise((resolve, reject) => {
            PresencaModel.findById(id, function (err, presenca) {
                if (err) 
                    reject(err);
                
    
                resolve(presenca);
            });
        });
    }
    
    function findAll(pagination) {
        const {limit, skip} = pagination;
    
        return new Promise((resolve, reject) => {
            PresencaModel.find({}, {}, {
                skip,
                limit
            }, function (err, presenca) {
                if (err) 
                    reject(err);
                
    
                resolve(presenca);
            });
        }).then(async (presenca) => {
            const totalPresencas = await PresencaModel.count();
    
            return Promise.resolve({
                data: presenca,
                pagination: {
                    pageSize: limit,
                    page: Math.floor(skip / limit),
                    hasMore: skip + limit < totalPresencas,
                    total: totalPresencas
                }
            });
        });
    }
    
    function deleteById(id) {
        return new Promise((resolve, reject) => {
            PresencaModel.deleteOne({
                _id: id
            }, function (err, presenca) {
                if (err) 
                    reject(err);
                
    
                resolve(presenca);
            });
        });
    }
    
    function save(model) {
        return new Promise(function (resolve, reject) { // do a thing, possibly async, then…
            model.save(function (err) {
                if (err) 
                    reject(err);
                

                resolve({message: 'Presenca criada', presenca: model});
            });
        });
    }

    return service;
};

module.exports = PresencaService;    