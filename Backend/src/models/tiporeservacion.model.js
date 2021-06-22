'use strict'
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

var ReservationTypeSchema = Schema({
    nombre: String,
    precio: Number,
    servicios: [{
        servicio: {type: Schema.Types.ObjectId, ref: 'Servicios'}
    }]
}, {collection: 'tiporeservacion'})

module.exports = mongoose.model("TipoReservacion", ReservationTypeSchema)