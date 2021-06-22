'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ReservationSchema = Schema({
    fechaInicio: Date,
    fechaFinal: Date,
    tipoReservacion: {type: Schema.Types.ObjectId, ref: 'TipoReservacion'},
    evento: {type: Schema.Types.ObjectId, ref: 'Eventos'},
    rooms: [{
        room: {type: Schema.Types.ObjectId, ref: 'Habitaciones'}
    }],
    total: Number,
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuario'}
}, {collection: 'reservacion'})

module.exports = mongoose.model("Reservacion", ReservationSchema)