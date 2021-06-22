'use strict'
const Usuario = require("../models/usuario.model")
const bcrypt = require("bcrypt-nodejs")
const Servicios = require("../models/servicios.model")
const TipoReservacion = require("../models/tiporeservacion.model")
const Habitacion = require("../models/habitacion.model")
const Hotel = require("../models/hotel.model")
const Reservacion = require("../models/reservacion.model")


//Función de Ejemplo Admin Hotel
async function ejemploAdminHotel(req, res){
    res.status(200).send({mensaje: "Ejemplo desde AdminHotel Controller"})
}

//Función para agregar servicios
async function addService(req, res){
    var serviciosModel = new Servicios();
    var params = req.body;
    if(params.nombre && params.description){
        serviciosModel.nombre = params.nombre;
        serviciosModel.description = params.description;

        await Servicios.find({$or: [
            {nombre: serviciosModel.nombre}
        ]}).exec((err, serviceSee)=>{
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(serviceSee && serviceSee.length >=1){
                return res.status(500).send({mensaje: "El servicio ya existe"})
            }else{
                serviciosModel.save((err, serviceSave)=>{
                    if(err){
                        return res.status(500).send({mensaje: "Error en la petición"})
                    }else if(!serviceSave){
                        return res.status(500).send({mensaje: "No se pudo almacenar el registro"})
                    }else{
                        return res.status(200).send({serviceSave})
                    }
                })
            }
        })
    }else{
        return res.status(500).send({mensaje: "No ha ingresado los parámetros solicitados"})
    }
}

//Función para editar servicios
async function editService(req, res){
    var idServicio = req.params.idServicio;
    var params = req.body;

    await Servicios.findByIdAndUpdate(idServicio, params,{new: true}, (err, serviceEdit)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!serviceEdit){
            return res.status(500).send({mensaje: "No se ha podido editar el servicio"})
        }else{
            return res.status(200).send({serviceEdit})
        }
    })
}

//Función para eliminar servicios
async function deleteService(req, res){
    var idServicio = req.params.idServicio

    await Servicios.findByIdAndDelete(idServicio, (err, serviceDelete)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!serviceDelete){
            return res.status(500).send({mensaje: "No se ha podido eliminar el servicio"})
        }else{
            return res.status(200).send({serviceDelete})
        }
    })
}

//Función para obtener un servicio por Id
async function seeServiceId(req, res){
    var idService = req.params.idService;

    await Servicios.findById(idService, (err, seeService)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!seeService){
            return res.status(500).send({mensaje: "No se ha podido obtener el servicio"})
        }else{
            return res.status(200).send({seeService})
        }
    })
}

//Función para ver los servicios
async function seeService(req, res){
    await Servicios.find((err, serviceSee)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!serviceSee){
            return res.status(500).send({mensaje: "No se han podido obtener los servicios"})
        }else{
            return res.status(200).send({serviceSee})
        }
    })
}

//Función para agregar el tipo de servicio
async function addReservationType(req, res){
    var tiporeservacionModel = new TipoReservacion();
    var params = req.body;

    if(params.nombre && params.precio){
        tiporeservacionModel.nombre = params.nombre;
        tiporeservacionModel.precio = params.precio;

        await TipoReservacion.find({$or: [
            {nombre: tiporeservacionModel.nombre}
        ]}).exec((err, typeservice)=>{
            if(err){
                console.log(err);
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(typeservice && typeservice.length >= 1){
                return res.status(500).send({mensaje: "El Tipo de Reservación es existente"})
            }else{
                tiporeservacionModel.save((err, typeserviceSave)=>{
                    if(err){
                        return res.status(500).send({mensaje: "Error en la petición"})
                    }else if(!typeserviceSave){
                        return res.status(500).send({mensaje: "No se ha podido almacenar el tipo de reservación"})
                    }else{
                        return res.status(200).send({typeserviceSave})
                    }
                })
            }
        })
    }else{
        return res.status(500).send({mensaje:"No ha ingresado todos los parámetros"})
    }
}

//Función para agregar servicios al tipo Reservación
async function addServiceinReservationType(req, res){
    var idReservationType = req.params.idReservationType;
    var params = req.body;

    await TipoReservacion.findByIdAndUpdate(idReservationType, {$push: {servicios: {servicio: params.servicio}}}, {new: true}, (err, addService)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!addService){
            return res.status(500).send({mensaje: "No se ha podido agregar el servicio"})
        }else{
            return res.status(200).send({addService})
        }
    })
}

//Función para obtener el tipo de reservación
async function seeReservationType(req, res){
    await TipoReservacion.find().populate('servicios.servicio', 'nombre description').exec((err, seeReservationType)=>{
        if(err){
            console.log(err);
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!seeReservationType){
            return res.status(500).send({mensaje: "No se han podido obtener los tipos de reservación"})
        }else{
            return res.status(200).send({seeReservationType})
        }
    })
}

//Función para obtener el tipo de reservación por id
async function seeReservationTypeId(req, res){
    var idReservationType = req.params.idReservationType;

    await TipoReservacion.findById(idReservationType).populate('servicios.servicio', 'nombre description').exec((err, ReservationType)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!ReservationType){
            return res.status(500).send({mensaje: "No se ha podido obtener el tipo de reservación requerido"})
        }else{
            return res.status(200).send({ReservationType})
        }
    })
}

//Función para editar el tipo de reservación
async function editReservationType(req, res){
    var idReservationType = req.params.idReservationType;
    var params = req.body;

    await TipoReservacion.findByIdAndUpdate(idReservationType, params,{new: true}, (err, reservationtypeEdit)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!reservationtypeEdit){
            return res.status(500).send({mensaje: "No se ha podido editar el tipo de reservación"})
        }else{
            return res.status(200).send({reservationtypeEdit})
        }
    })
}

//Función para eliminar el tipo de reservación
async function deleteReservationType(req, res){
    var idReservationType = req.params.idReservationType;

    await TipoReservacion.findByIdAndDelete(idReservationType, (err, reservationtypeDelete)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!reservationtypeDelete){
            return res.status(500).send({mensaje: "No se pudo eliminar el tipo de reservación"})
        }else{
            return res.status(200).send({reservationtypeDelete})
        }
    })
}

//Función para eliminar el servicio en tipo reservación
async function deleteServiceinReservation(req, res){
    var idService = req.params.idService;

    await TipoReservacion.findOneAndUpdate({'servicios._id': idService}, {$pull: {servicios: {_id: idService}}}, {new: true},(err, serviceDelete)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!serviceDelete){
            return res.status(500).send({mensaje: "No se ha podido eliminar el servicio"})
        }else{
            return res.status(200).send({serviceDelete})
        }
    })
}

//Función para agregar una habitación
async function addRoom(req, res){
    if(req.user.rol === "Admin_Hotel"){
        var habitacionModel = new Habitacion();
        var params = req.body;

        if(params.room_code && params.precio && params.hotel){
            habitacionModel.room_code = params.room_code;
            habitacionModel.precio = params.precio;
            habitacionModel.disponibility = "true";
            habitacionModel.hotel = params.hotel;

            
            await habitacionModel.save((err, roomSave)=>{
                if(err){
                    return res.status(500).send({mensaje: "Error en la petición"})
                }else if(!roomSave){
                    return res.status(500).send({mensaje: "No se ha podido almacenar la habitación"})
                }else{
                    return res.status(200).send({roomSave})
                }
            })
        }else{
            return res.status(500).send({mensaje:"No ha ingresado todos los parámetros"})
        }
    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización"})
    }
}

//Función para obtener las habitaciones
async function seeRoom(req, res){
    await Habitacion.find().populate('hotel', 'nombre direccion').exec((err, searchRoom)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!searchRoom){
            return res.status(500).send({mensaje: "No se ha podido obtener las habitaciones"})
        }else{
            return res.status(200).send({searchRoom})
        }
    })
}

//Función para obtener la habitación por id
async function seeRoomId(req, res){
    if(req.user.rol === "Admin_Hotel"){
        var idRoom = req.params.idRoom;
        await Habitacion.findById(idRoom).populate('hotel', 'nombre direccion').exec((err, roomSee)=>{
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!roomSee){
                return res.status(500).send({mensaje: "No se pudo obtener la habitación"})
            }else{
                return res.status(200).send({roomSee})
            }
        })
    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización"})
    }
}

//Función para editar la habitación
async function editRoom(req, res){
    if(req.user.rol === "Admin_Hotel"){
        var idRoom = req.params.idRoom;
        var params = req.body;
        await Habitacion.findByIdAndUpdate(idRoom, params, {new: true}, (err, roomEdit)=>{
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!roomEdit){
                return res.status(500).send({mensaje: "No se ha podido editar la habitación"})
            }else{
                return res.status(200).send({roomEdit})
            }
        })
    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización"})
    }
}

//Función para eliminar la habitación
async function deleteRoom(req, res){
    if(req.user.rol === "Admin_Hotel"){
        var idRoom = req.params.idRoom;
        await Habitacion.findByIdAndDelete(idRoom, (err, roomDelete)=>{
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(!roomDelete){
                return res.status(500).send({mensaje: "No se ha podido eliminar la habitación"})
            }else{
                return res.status(200).send({roomDelete})
            }
        })
    }else{
        return res.status(500).send({mensaje: "No tiene el rol de autorización"})
    }
}

//Función para ver todas las reservaciones de un usuario
async function seeReservationOfUser(req, res){
    var idUsuario = req.params.idUsuario;
    await Reservacion.find({usuario: idUsuario}).populate('tipoReservacion evento rooms.room usuario', 'nombre room_code').exec((err, seeReservacion)=>{
        if(err){
            return res.status(500).send({mensaje: "Error en la petición"})
        }else if(!seeReservacion){
            return res.status(500).send({mensaje: "No se ha podido obtener la reservación"})
        }else{
            return res.status(200).send({seeReservacion})
        }
    })
}

module.exports = {
    ejemploAdminHotel,
    addService,
    editService,
    deleteService,
    seeServiceId,
    seeService,
    addReservationType,
    addServiceinReservationType,
    seeReservationType,
    seeReservationTypeId,
    editReservationType,
    deleteReservationType,
    deleteServiceinReservation,
    addRoom,
    seeRoom,
    seeRoomId,
    editRoom,
    deleteRoom,
    seeReservationOfUser
}