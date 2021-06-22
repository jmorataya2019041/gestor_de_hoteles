'use strict'
const express = require("express")
const adminAppcontroller = require("../controller/AdminApp.controller")
var md_autenticacion = require("../middlewares/authenticated")

//Rutas
var api = express.Router();
api.get("/ejemploAdmin", md_autenticacion.ensureAuth ,adminAppcontroller.ejemploAdmin);
api.get('/obtenerAdminHotel', adminAppcontroller.obtenerAdminHotel)
api.get('/obtenerClientes', adminAppcontroller.obtenerClientes)
api.get("/getUserId/:idUser", adminAppcontroller.getUserId)
api.post("/addHotel", md_autenticacion.ensureAuth, adminAppcontroller.addHotel)
api.get("/obtenerHoteles", md_autenticacion.ensureAuth , adminAppcontroller.obtenerHoteles)
api.get('/obtenerHotel/:idHotel', adminAppcontroller.obtenerHotelId)
api.put("/editHotel/:idHotel", adminAppcontroller.editHotel)
api.delete("/deleteHotel/:idHotel", adminAppcontroller.deleteHotel)
api.put('/editUser/:idUser', md_autenticacion.ensureAuth, adminAppcontroller.editUser)
api.delete('/deleteUser/:idUser', md_autenticacion.ensureAuth, adminAppcontroller.deleteUser)
api.get('/userSee/:idUser', adminAppcontroller.seeUser)
api.post('/addEvento', md_autenticacion.ensureAuth, adminAppcontroller.addEvent)
api.get('/getEvent', adminAppcontroller.getEvent)
api.get('/getEventId/:idEvento', md_autenticacion.ensureAuth, adminAppcontroller.getEventId)
api.put('/editEvento/:idEvento', md_autenticacion.ensureAuth, adminAppcontroller.editEvent)
api.delete('/deleteEvento/:idEvento', md_autenticacion.ensureAuth, adminAppcontroller.deleteEvent)

module.exports = api;