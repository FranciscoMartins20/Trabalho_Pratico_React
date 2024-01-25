let mongoose = require("mongoose");


let Schema = mongoose.Schema;


// create a schema
let AcessSchema = new Schema({
    Users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    data_entrada: {
        type: Date,
        required: true
    },
    hora_entrada: {
        type: String,
        required: true
    },
    hora_saida: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean
    },
    local: {
        type: String
    }
});

// the schema is useless so far
// we need to create a model using it
let Acessos = mongoose.model("Acessos", AcessSchema);

// make this available to our users in our Node applications
module.exports = Acessos;

