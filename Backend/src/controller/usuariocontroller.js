'use strict'
const TipoReservacion = require("../models/tiporeservacion.model")
const Usuario = require("../models/usuario.model")
const bcrypt = require("bcrypt-nodejs")
const Habitacion = require("../models/habitacion.model")
const Hotel = require("../models/hotel.model")
const Reservacion = require("../models/reservacion.model")
const e = require("cors")

//Función de prueba
function UsuarioPrueba(req, res){
    return res.status(200).send({mensaje: "Prueba desde Usuario Controlador"})
}

//Función para registrarse
async function Registro(req, res){
    var usuarioModel = new Usuario();
    var params = req.body;
    if(params.nombre && params.usuario && params.password){
        usuarioModel.nombre = params.nombre;
        usuarioModel.usuario = params.usuario;
        usuarioModel.email = params.email;
        usuarioModel.rol = "Rol_Cliente";

        await Usuario.find({$or: [
            {usuario: usuarioModel.usuario},
            {email: usuarioModel.email}
        ]}).exec((err, usersSee)=>{
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(usersSee && usersSee.length >=1){
                return res.status(500).send({mensaje: "El usuario es existente"})
            }else{
                bcrypt.hash(params.password, null, null, (err, passEncrypt)=>{
                    usuarioModel.password = passEncrypt;

                    usuarioModel.save((err, userSave)=>{
                        if(err){
                            return res.status(500).send({mensaje: "Error en la petición"})
                        }else if(!userSave){
                            return res.status(500).send({mensaje: "El usuario no se ha podido registrar"})
                        }else{
                            return res.status(200).send({userSave})
                        }
                    })
                })
            }
        })
    }else{
        return res.status(500).send({mensaje: "No ha ingresado todos los datos solicitados"})
    }
}

//Función para editar perfil
async function editarRegistro(req,res){
    var idUsuario = req.params.idUsuario;
    var params = req.body;
    if(idUsuario != req.user.sub){
        return res.status(500).send({mensaje: "No tiene la autorización para editar"})
    }else{
        //Eliminar el password para no poder ser editado
        delete params.password;

        await Usuario.findByIdAndUpdate(idUsuario, params, {new: true}, (err, userUpdate)=>{
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!userUpdate){
                return res.status(500).send({mensaje: "No se pudo editar el registro"})
            }
            else{
                return res.status(200).send({userUpdate})
            }
        })
    }
}

//Función para eliminar perfil
async function eliminarRegistro(req, res){
    var idUsuario = req.params.idUsuario;

    if(idUsuario != req.user.sub){
        return res.status(500).send({mensaje: "No tiene la autorización para eliminar el registro"})
    }else{
        await Usuario.findByIdAndDelete(idUsuario, (err, userDelete)=>{
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!userDelete){
                return res.status(500).send({mensaje: "No se ha podido eliminar el registro"})
            }else{
                return res.status(200).send({userDelete})
            }
        })
    }
}

//Función para ver las habitaciones por hoteles
async function seeRoomforHotel(req, res){
    var idHotel = req.params.idHotel;

    await Habitacion.find({hotel: idHotel}).populate('hotel', 'nombre direccion').exec((err, roomHotel)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!roomHotel){
            return res.status(500).send({mensaje: "No se han podido obtener las habitaciones"})
        }else{
            return res.status(200).send({roomHotel})
        }
    })
}

//Función para ver los hoteles
async function getHoteles(req, res){
    await Hotel.find().populate('admin', 'nombre usuario email rol').exec((err, getHoteles)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!getHoteles){
            return res.status(500).send({mensaje: "No se han podido obtener los hoteles"})
        }else{
            return res.status(200).send({getHoteles})
        }
    })
}

//Función para obtener todos los usuarios
async function getUsuarios(req, res){
    await Usuario.find((err, usuariosObtenidos)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!usuariosObtenidos){
            return res.status(500).send({mensaje: "Error al obtener los usuarios"})
        }else{
            return res.status(200).send({usuariosObtenidos})
        }
    })
}

//Función para realizar una reservación
async function addReservation(req, res){
    var reservacionModel = new Reservacion();
    var params = req.body;

    if(params.fechaInicio && params.fechaFinal){
        reservacionModel.fechaInicio = params.fechaInicio;
        reservacionModel.fechaFinal = params.fechaFinal;
        reservacionModel.tipoReservacion = params.tipoReservacion;
        reservacionModel.evento = params.evento;
        reservacionModel.usuario = req.user.sub;

        var tipoReservacion = await TipoReservacion.findById(params.tipoReservacion);

        reservacionModel.total = tipoReservacion.precio;
        if(params.fechaFinal < params.fechaInicio){
            return res.status(500).send({mensaje: "Error al reservar"})
        }

        Reservacion.find({$or:[
            {fechaInicio: reservacionModel.fechaInicio},
            {fechaFinal: reservacionModel.fechaFinal}
        ]}).exec((err, reservacion)=>{
            if(err){
                console.log(err);
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(reservacion && reservacion.length >= 1){
                return res.status(500).send({mensaje: "La reservación ya es existente"})
            }else{
                reservacionModel.save((err, reservacionSave)=>{
                    if(err){
                        console.log(err);
                        return res.status(500).send({mensaje: "Error en la petición"})
                    }else if(!reservacionSave){
                        return res.status(500).send({mensaje: "No se ha podido almacenar su reservación"})
                    }else{
                        return res.status(200).send({reservacionSave})
                    }
                })
            }
        })
    }else{
        return res.status(500).send({mensaje: "No ha ingresado todos los parámetros"})
    }
}

//Función para agregar habitaciones a la reservación
async function addRoomforReservation(req, res){
    var idReservacion = req.params.idReservacion;
    var params = req.body;

    await Habitacion.findByIdAndUpdate(params.room, {disponibility: false});
    var PrecioRoom = await Habitacion.findById(params.room);
    var Total = await Reservacion.findById(idReservacion);

    await Reservacion.findByIdAndUpdate(idReservacion, {total: PrecioRoom.precio + Total.total})

    await Reservacion.findByIdAndUpdate(idReservacion, {$push: {rooms: {room: params.room}}}, {new: true}, (err, addRoom)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!addRoom){
            return res.status(500).send({mensaje: "No se ha podido agregar la habitación"})
        }else{
            return res.status(200).send({addRoom})
        }
    })
}

//Función para editar la reservación
async function editReservation(req, res){
    var idReservacion = req.params.idReservacion;
    var params = req.body;

        
    var Reservation = await Reservacion.findById(idReservacion);
    if(params.fechaFinal < params.fechaInicio){
        return res.status(500).send({mensaje: "Error al reservar"})
    }
    var ReservationType = await TipoReservacion.find({_id: Reservation.tipoReservacion})
    var newReservationType = await TipoReservacion.findById(params.tipoReservacion)
    
    //await Reservacion.findByIdAndUpdate(idReservacion,{total: {$subtract: [Reservation.total, ReservationType.precio]}})
    await Reservacion.findByIdAndUpdate(idReservacion, {total: Reservation.total + newReservationType.precio})

    await Reservacion.findByIdAndUpdate(idReservacion, params, {new: true}, (err, editReservation)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!editReservation){
            return res.status(500).send({mensaje: "No se ha podido editar la reservación"})
        }else{
            return res.status(200).send({editReservation})
        }
    })
}

//Función para eliminar la reservación
async function deleteReservation(req, res){
    var idReservacion = req.params.idReservacion;

    var roomStatus = await Reservacion.findById(idReservacion).populate('rooms.room', '_id room_code').exec();

    await Habitacion.findByIdAndUpdate(roomStatus.rooms.room, {disponibility: true})

    await Reservacion.findByIdAndDelete(idReservacion, (err, deleteReservation)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!deleteReservation){
            return res.status(500).send({mensaje: "No se ha podido eliminar la reservación"})
        }else{
            return res.status(200).send({deleteReservation})
        }
    })
}

//Función para ver todas las reservaciones de un usuario
async function seeReservations(req, res){
    var idUsuario = req.params.idUsuario;
    if(idUsuario != req.user.sub){
        return res.status(500).send({mensaje: "No tiene la autorización para"})
    }else{
        await Reservacion.find({usuario: idUsuario}).populate('tipoReservacion evento rooms.room usuario', 'nombre room_code').exec((err, seeReservation)=>{
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!seeReservation){
                return res.status(500).send({mensaje: "No se ha podido obtener la reservación"})
            }else{
                return res.status(200).send({seeReservation})
            }
        })
    }
}

//Función para obtener las habitaciones disponibles
async function roomDisponibility(req, res){
    await Habitacion.find({disponibility: true}).populate('hotel', 'nombre').exec((err, roomdisponibility)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!roomdisponibility){
            return res.status(500).send({mensaje: "No se han podido obtener las habitaciones disponibles"})
        }else{
            return res.status(200).send({roomdisponibility})
        }
    })
}

//Función para obtener una reservación
async function reservationId(req, res){
    var idReservacion = req.params.idReservacion;
    await Reservacion.findById(idReservacion).populate('rooms.room usuario', 'nombre room_code precio').exec((err, reservationSee)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!reservationSee){
            return res.status(500).send({mensaje: "No se pudo obtener la reservación"})
        }else{
            return res.status(200).send({reservationSee})
        }
    })
}

module.exports = {
    UsuarioPrueba,
    Registro,
    editarRegistro,
    eliminarRegistro,
    getHoteles,
    seeRoomforHotel,
    getUsuarios,
    addReservation,
    addRoomforReservation,
    editReservation,
    deleteReservation,
    seeReservations,
    roomDisponibility,
    reservationId
}