'use strict'
const Usuario = require("../models/usuario.model");
const Hotel = require("../models/hotel.model")
const Evento = require("../models/evento.model")
const bcrypt = require("bcrypt-nodejs");
const e = require("express");

//Función de ejemplo
async function ejemploAdmin(req, res){
    return res.status(200).send({mensaje: `Ejemplo desde usuario AdminApp: ${req.user.nombre}`})
}

//Crear admin por default
async function adminDefault(nombre, usuario, email, password, rol){
    var usuarioModel = new Usuario();

    if(nombre && usuario && email && password && rol){
        usuarioModel.nombre = nombre;
        usuarioModel.usuario = usuario;
        usuarioModel.email = email;
        usuarioModel.password = password;
        usuarioModel.rol = rol;
        Usuario.find({$or: [
            {usuario: usuarioModel.usuario},
            {email: usuarioModel.email}
        ]}).exec((err, usuariosEncontrados)=>{
            if(err){
                console.log(err);
            }else if(usuariosEncontrados && usuariosEncontrados.length >=1){
                console.log("El administrador ya existe");
            }else{
                bcrypt.hash(usuarioModel.password, null, null, (err, passEncrypt)=>{
                    usuarioModel.password = passEncrypt;
                    usuarioModel.save((err, save)=>{
                        if(err){
                            console.log(err);
                        }else if(!save){
                            console.log("No se ha podido guardar el usuario");
                        }else{
                            console.log(save);
                        }
                    })
                })
            }
        })
    }else{
        console.log({status:"No ha ingresado todos los parámetros"});
    }
}

//Función para obtener todos los administradores de hotel
async function obtenerAdminHotel(req, res){
    Usuario.find({rol: "Admin_Hotel"}, (err, getAdmins)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!getAdmins){
            return res.status(500).send({mensaje: "No se han podido obtener los usuarios"})
        }else{
            return res.status(200).send({getAdmins})
        }
    })
}

//Función para obtener todos los administradores de hotel
async function obtenerClientes(req, res){
  Usuario.find({rol: "Rol_Cliente"}, (err, getClientes)=>{
      if(err){
          return res.status(500).send({mensaje: "Error en la petición"})
      }else if(!getClientes){
          return res.status(500).send({mensaje: "No se han podido obtener los usuarios"})
      }else{
          return res.status(200).send({getClientes})
      }
  })
}

//Función para obtener los usuarios por Id
async function getUserId(req, res){
        var idUser = req.params.idUser;

        await Usuario.findById(idUser, (err, getUser)=>{
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!getUser){
                return res.status(500).send({mensaje: "No se han obtenido los usuarios"})
            }else{
                return res.status(200).send({getUser})
            }
        })
}

//Función para agregar hotel
async function addHotel(req, res){
    if(req.user.rol === "Admin_App"){
        var params = req.body;
        var hotelModel = new Hotel();
        if(params.nombre && params.direccion){
            hotelModel.nombre = params.nombre;
            hotelModel.direccion = params.direccion;
            hotelModel.admin = params.admin;

            await Usuario.findByIdAndUpdate(params.admin, {rol: 'Admin_Hotel'})

            await Hotel.find({$or: [
                {nombre: hotelModel.nombre},
                {direccion: hotelModel.direccion},
                {admin: hotelModel.admin}
            ]}).exec((err, hotelVisto)=>{
                if(err){
                    return res.status(500).send({mensaje: "Error en la petición"})
                }else if(hotelVisto && hotelVisto.length >= 1){
                    return res.status(500).send({mensaje: "Hotel ya existente"})
                }else{
                    hotelModel.save((err, hotelSave)=>{
                        if(err){
                            return res.status(500).send({mensaje: "Error en la petición"})
                        }else if(!hotelSave){
                            return res.status(500).send({mensaje: "El hotel no se ha podido guardar"})
                        }else{
                            return res.status(200).send({hotelSave})
                        }
                    })
                }
            })
        }else{
            return res.status(500).send({mensaje: "No ha ingresado todos los parámetros"})
        }
    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización"})
    }
}

//Función para obtener los hoteles
async function obtenerHoteles(req, res){
    if(req.user.rol === "Admin_App"){
        await Hotel.find((err, getHoteles)=>{
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!getHoteles){
                return res.status(500).send({mensaje: "No se ha podido obtener los hoteles"})
            }else{
                return res.status(200).send({getHoteles})
            }
        })
    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización"})
    }
}

//Función para obtener un hotel
async function obtenerHotelId(req, res){
    var idHotel = req.params.idHotel;
    await Hotel.findById(idHotel).populate('admin', 'nombre usuario email rol').exec((err, hotel)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!hotel){
            return res.status(500).send({mensaje: "No se han podido obtener los hoteles"})
        }else{
            return res.status(200).send({hotel})
        }
    })
}

//Función para editar hotel
async function editHotel(req, res){
    var idHotel = req.params.idHotel;
    var params = req.body;

    var adminActual = await Hotel.findById(idHotel);

    await Usuario.findByIdAndUpdate(adminActual.admin, {rol: "Rol_Cliente"});

    await Usuario.findByIdAndUpdate(params.admin, {rol: "Admin_Hotel"});

    await Hotel.findByIdAndUpdate(idHotel, params, {new: true} , (err, updateHotel)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!updateHotel){
            return res.status(500).send({mensaje: "No se ha podido editar el hotel"})
        }else{
            return res.status(200).send({updateHotel})
        }
    })
}

//Función para eliminar el hotel
async function deleteHotel(req, res){
    var idHotel = req.params.idHotel;

    var adminHotel = await Hotel.findById(idHotel);

    await Usuario.findByIdAndUpdate(adminHotel.admin, {rol: "Rol_Cliente"});

    await Hotel.findByIdAndDelete(idHotel, (err, deleteHotel)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!deleteHotel){
            return res.status(500).send({mensaje: "No se ha podido eliminar el hotel"})
        }else{
            return res.status(200).send({deleteHotel})
        }
    })
}

//Función para editar un usuario
async function editUser(req, res){
    if(req.user.rol === "Admin_App"){
        var idUser = req.params.idUser;
        var params = req.body;

        delete params.password;

        await Usuario.findByIdAndUpdate(idUser, params, (err, userEdit)=>{
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!userEdit){
                return res.status(500).send({mensaje: "No se ha podido editar el usuario"})
            }else{
                return res.status(200).send({userEdit})
            }
        })
    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización"})
    }
}

//Función para eliminar el usuario
async function deleteUser(req, res){
    if(req.user.rol === "Admin_App"){
        var idUser = req.params.idUser;

        await Usuario.findByIdAndDelete(idUser, (err, userDelete)=>{
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!userDelete){
                return res.status(500).send({mensaje: "No se pudo eliminar el usuario"})
            }else{
                return res.status(200).send({userDelete})
            }
        })
    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización"})
    }
}

//Función para ver un usuario
async function seeUser(req, res){
    var idUser = req.params.idUser;

    await Usuario.findById(idUser, (err, userSee)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!userSee){
            return res.status(500).send({mensaje: "Error al obtener el usuario"})
        }else{
            return res.status(200).send({userSee})
        }
        })
}

//Función para agregar un evento
async function addEvent(req, res){
    if(req.user.rol === "Admin_App"){
        var params = req.body;
        var eventoModel = new Evento();
        if(params.nombre && params.descripcion){
            eventoModel.nombre = params.nombre;
            eventoModel.descripcion = params.descripcion;

            Evento.find({$or: [
                {nombre: eventoModel.nombre},
                {descripcion: eventoModel.descripcion}
            ]}).exec((err, eventoSee)=>{
                if(err){
                    return res.status(500).send({mensaje: "Error en la petición"})
                }else if(eventoSee && eventoSee.length >= 1){
                    return res.status(500).send({mensaje: "El evento es existente"})
                }else{
                    eventoModel.save((err, eventoSave)=>{
                        if(err){
                            return res.status(500).send({mensaje: "Error en la petición"})
                        }else if(!eventoSave){
                            return res.status(500).send({mensaje: "No se ha podido almacenar el evento"})
                        }else{
                            return res.status(200).send({eventoSave})
                        }
                    })
                }
            })
        }else{
            return res.status(500).send({mensaje: "No ha ingresado todos los parámetros"})
        }
    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización"})
    }
}

//Función para obtener los eventos
async function getEvent(req, res){
    await Evento.find((err, getEvents)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!getEvents){
            return res.status(500).send({mensaje: "No se han podido obtener los eventos"})
        }else{
            return res.status(200).send({getEvents})
        }
    })
}

//Función para obtener un solo evento
async function getEventId(req, res){
    if(req.user.rol === "Admin_App"){
        var idEvento = req.params.idEvento;

        await Evento.findById(idEvento, (err, getEvento)=>{
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!getEvento){
                return res.status(500).send({mensaje: "No se ha podido obtener el evento"})
            }else{
                return res.status(200).send({getEvento})
            }
        })
    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización"})
    }
}

//Función para editar el evento
async function editEvent(req, res){
    if(req.user.rol === "Admin_App"){
        var idEvento = req.params.idEvento;
        var params = req.body;

        await Evento.findByIdAndUpdate(idEvento, params, (err, editEvento)=>{
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!editEvento){
                return res.status(500).send({mensaje: "No se ha podido editar el evento"})
            }else{
                return res.status(200).send({editEvento})
            }
        })
    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización"})
    }
}

//Función para eliminar el evento
async function deleteEvent(req, res){
    if(req.user.rol === "Admin_App"){
        var idEvento = req.params.idEvento;

        await Evento.findByIdAndDelete(idEvento, (err, deleteEvento)=>{
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!deleteEvento){
                return res.status(500).send({mensaje: "No se ha podido eliminar el evento"})
            }else{
                return res.status(200).send({deleteEvento})
            }
        })
    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización"})
    }
}


//Módulos de exportación para las rutas
module.exports = {
    adminDefault,
    ejemploAdmin,
    obtenerAdminHotel,
    obtenerClientes,
    getUserId,
    addHotel,
    obtenerHoteles,
    obtenerHotelId,
    editHotel,
    deleteHotel,
    editUser,
    deleteUser,
    seeUser,
    addEvent,
    getEvent,
    getEventId,
    editEvent,
    deleteEvent
}