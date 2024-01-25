let mongoose = require("mongoose");

let Schema = mongoose.Schema;

// create a schema
let PresencaSchema = new Schema({
    Aula: {
        type: Schema.Types.ObjectId,
        ref: 'Aulas',
        required: true,
        unique: false

    },
    Aluno: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: false
    }

});

// the schema is useless so far
// we need to create a model using it
let Presenca = mongoose.model("Presenca", PresencaSchema);

// make this available to our users in our Node applications
module.exports = Presenca;
