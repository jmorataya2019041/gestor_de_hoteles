'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var EventoShema = Schema({
    nombre: String,
    descripcion: String,
}, {collection: 'eventos'})

module.exports = mongoose.model('Eventos', EventoShema)