'use strict'
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

//Cabeceras
app.use(cors());

//Importación rutas
const adminApp_rutas = require("./src/rutas/AdminApp.rutas")
const login_rutas = require("./src/rutas/login.rutas")
const adminHotel_rutas = require("./src/rutas/AdminHotel.rutas")
const usuario_rutas = require("./src/rutas/usuario.rutas")

//Middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Carga de rutas localhost:300/api/ejemplo
app.use('/api', login_rutas);
app.use('/api', adminApp_rutas);
app.use('/api', adminHotel_rutas);
app.use('/api', usuario_rutas);

//Exportar
module.exports = app;