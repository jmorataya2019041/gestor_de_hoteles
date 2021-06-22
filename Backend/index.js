'use strict'
const mongoose = require("mongoose");
const app = require("./app");
const admin = require("./src/controller/AdminApp.controller")

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/gestorhoteles', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(()=>{
    console.log("Se encuentra conectado a la base de datos");
    
    creatAdminApp();
    
    app.listen(3000, function(){
        console.log("Esta funcionando en el puerto 3000");
    })
}).catch(err => console.log(err))

//Admin Default
const creatAdminApp = ()=>{
    admin.adminDefault("Jorge Morataya","jmorataya","jmorataya@kinal.edu.gt","12345678","Admin_App");
}