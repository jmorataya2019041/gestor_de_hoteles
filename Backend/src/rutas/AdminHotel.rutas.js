'use strict'
const express = require("express");
const adminhotelController = require("../controller/AdminHotel.controller")

var md_autenticacion = require("../middlewares/authenticated")

//Rutas
var api = express.Router();
api.get('/ejemploAdminHotel', adminhotelController.ejemploAdminHotel)
api.post('/addService', adminhotelController.addService)
api.put('/editService/:idServicio', adminhotelController.editService)
api.delete('/deleteService/:idServicio', adminhotelController.deleteService)
api.get('/seeService', adminhotelController.seeService)
api.get('/seeServiceId/:idService', adminhotelController.seeServiceId)
api.post('/addReservationType', adminhotelController.addReservationType)
api.put('/addServiceReservation/:idReservationType', adminhotelController.addServiceinReservationType)
api.get('/getReservationType', adminhotelController.seeReservationType)
api.get('/getReservationTypeId/:idReservationType', adminhotelController.seeReservationTypeId)
api.put('/editReservationType/:idReservationType', adminhotelController.editReservationType)
api.delete('/deleteReservationType/:idReservationType', adminhotelController.deleteReservationType)
api.delete('/deleteServiceinReservation/:idService', adminhotelController.deleteServiceinReservation)
api.post('/addRoom', md_autenticacion.ensureAuth, adminhotelController.addRoom)
api.get('/searchRoom', adminhotelController.seeRoom),
api.get('/seeRoomId/:idRoom', md_autenticacion.ensureAuth, adminhotelController.seeRoomId)
api.put('/editRoom/:idRoom', md_autenticacion.ensureAuth, adminhotelController.editRoom)
api.delete('/deleteRoom/:idRoom', md_autenticacion.ensureAuth, adminhotelController.deleteRoom)
api.get('/reservationsUser/:idUsuario', adminhotelController.seeReservationOfUser)

module.exports = api;