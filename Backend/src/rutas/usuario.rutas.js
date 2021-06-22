'use strict'
const express = require("express")
const usuarioController = require("../controller/usuariocontroller")
var md_autenticacion = require("../middlewares/authenticated")

var api = express.Router();
api.get("/prueba", usuarioController.UsuarioPrueba)
api.post("/Registro", usuarioController.Registro)
api.put("/editarRegistro/:idUsuario", md_autenticacion.ensureAuth, usuarioController.editarRegistro)
api.delete("/eliminarRegistro/:idUsuario", md_autenticacion.ensureAuth, usuarioController.eliminarRegistro)
api.get('/getHoteles', usuarioController.getHoteles)
api.get('/roomHotel/:idHotel', usuarioController.seeRoomforHotel)
api.get('/obtenerUsuarios', usuarioController.getUsuarios)
api.post('/addReservacion', md_autenticacion.ensureAuth, usuarioController.addReservation)
api.put('/addRoomReservation/:idReservacion', usuarioController.addRoomforReservation)
api.put('/editReservation/:idReservacion', usuarioController.editReservation)
api.delete('/deleteReservation/:idReservacion', usuarioController.deleteReservation)
api.get('/seeReservations/:idUsuario', md_autenticacion.ensureAuth, usuarioController.seeReservations)
api.get('/roomDisponibility', usuarioController.roomDisponibility)
api.get('/reservationId/:idReservacion', usuarioController.reservationId)
module.exports = api;