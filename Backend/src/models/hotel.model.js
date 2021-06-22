'use strict'
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

var HotelSchema = Schema ({
    nombre: String,
    direccion: String,
    admin: {type: Schema.Types.ObjectId, ref: 'Usuario'},
}, {collection: 'hotel'})

module.exports = mongoose.model('Hotel', HotelSchema);