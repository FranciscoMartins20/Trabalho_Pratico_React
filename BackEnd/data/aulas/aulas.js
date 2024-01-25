let mongoose = require("mongoose");


let Schema = mongoose.Schema;


// create a schema
let AulasSchema = new Schema({
    Trainer: {
        type: String,
        ref: 'User',
        required: true

    },
    hora_inicio: {
        type: Date,
        required: true
    },
    hora_fim: {
        type: Date,
        required: true
    },
    tipo_aula: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    presencas: [{
        type: Schema.Types.ObjectId,
        ref: 'Presenca'
    }]
});
    


// the schema is useless so far
// we need to create a model using it
let Aulas = mongoose.model("Aulas", AulasSchema);

// make this available to our users in our Node applications
module.exports = Aulas;
