'use strict'
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

var HabitacionSchema = Schema({
    room_code: String,
    precio: Number,
    disponibility: Boolean,
    hotel: {type: Schema.Types.ObjectId, ref: 'Hotel'}
}, {collection: "habitaciones"})

module.exports = mongoose.model("Habitaciones", HabitacionSchema)