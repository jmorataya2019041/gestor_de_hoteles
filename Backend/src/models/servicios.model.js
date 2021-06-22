'use strict'
const mongoose = require("mongoose")
var Schema = mongoose.Schema;

var ServicioSchema = Schema({
    nombre: String,
    description: String
}, {collection: 'servicios'})

module.exports = mongoose.model("Servicios", ServicioSchema)