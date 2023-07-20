const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


//Create Schema
const ClienteSchema = new Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    cuit:{
        type: String,
        required: true
    }
});

module.exports = Cliente = mongoose.model('cliente', ClienteSchema)

