import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Evento } from '../modelos/evento.model';
import { Hotel } from '../modelos/hotel.model';
import { Servicios } from '../modelos/servicios.model';
import { ReservationType } from '../modelos/tiporeservacion.model';
import { Usuario } from '../modelos/usuario.model';
import { Global } from "./Global.service";
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAppService {
  public url: String;
  public header = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(public _http: HttpClient, public _usuarioService: UsuarioService) {
    this.url = Global.url;
  }

  //Función para agregar el hotel
  agregarHotel(hotel: Hotel): Observable<any>{
    let params = JSON.stringify(hotel);
    let headersToken = this.header.set('Authorization', this._usuarioService.getToken());

    return this._http.post(this.url + '/addHotel', params, {headers: headersToken})
  }

  //Función para obtener el hotel
  hotelId(id: String): Observable<any>{
    return this._http.get(this.url + '/obtenerHotel/' + id, {headers: this.header})
  }

  //Función para editar el hotel
  editarHotel(hotel: Hotel):Observable<any>{
    let params = JSON.stringify(hotel);
    let headersToken = this.header.set('Authorization', this._usuarioService.getToken())

    return this._http.put(this.url + '/editHotel/' + hotel._id, params, {headers: headersToken})
  }

  //Función para eliminar el hotel
  eliminarHotel(id: String): Observable<any>{
    let headersToken = this.header.set('Authorization', this._usuarioService.getToken())

    return this._http.delete(this.url + '/deleteHotel/' + id, {headers: headersToken})
  }

  //Función para obtener un usuario
  obtenerUsuario(id: String): Observable<any>{
    let headersToken = this.header.set('Authorization', this._usuarioService.getToken())

    return this._http.get(this.url + '/userSee/' + id, {headers: headersToken})
  }

  //Función para editar un usuario
  editUser(usuario: Usuario): Observable<any>{
    let params = JSON.stringify(usuario);
    let headersToken = this.header.set('Authorization', this._usuarioService.getToken())

    return this._http.put(this.url + '/editUser/' + usuario._id, params, {headers: headersToken})
  }

  //Función para eliminar un usuario
  deleteUser(id: String): Observable<any>{
    let headersToken = this.header.set('Authorization', this._usuarioService.getToken())

    return this._http.delete(this.url + '/deleteUser/' + id, {headers: headersToken})
  }

  //Función para obtener los servicios
  obtenerServicios():Observable<any>{
    return this._http.get(this.url + '/seeService', {headers: this.header})
  }

  //Función para obtener un servicio por Id
  obtenerServicio(id: String): Observable<any>{
    return this._http.get(this.url + '/seeServiceId/' + id, {headers: this.header})
  }

  //Función para agregar un nuevo servicio
  addService(servicio: Servicios): Observable<any>{
    let params = JSON.stringify(servicio);

    return this._http.post(this.url + '/addService', params, {headers: this.header})
  }

  //Función para editar el servicio
  editService(servicio: Servicios): Observable<any>{
    let params = JSON.stringify(servicio);

    return this._http.put(this.url + '/editService/' + servicio._id, params, {headers: this.header})
  }

  //Función para eliminar el servicio
  deleteService(id: String): Observable<any>{
    return this._http.delete(this.url + '/deleteService/'+ id, {headers: this.header})
  }

  //Función para agregar un tipo de reservación
  addTipoReservacion(reservationType: ReservationType): Observable<any>{
    let params = JSON.stringify(reservationType);

    return this._http.post(this.url + '/addReservationType', params, {headers: this.header})
  }

  //Función para agregar servicios al tipo de reservación
  serviceInReservationType(modeloServicio): Observable<any>{
    let params = JSON.stringify(modeloServicio);

    return this._http.put(this.url + '/addServiceReservation/' + modeloServicio.idReservationType, params, {headers: this.header})
  }

  //Función para eliminar el tipo de reservación
  deleteReservationType(id: String): Observable<any>{
    return this._http.delete(this.url + '/deleteReservationType/' + id, {headers: this.header})
  }

  //Función para obtener todos los tipos de reservación
  obtenerTiposReservacion(): Observable<any>{
    return this._http.get(this.url + '/getReservationType', {headers: this.header})
  }

  //Función para tener el tipo de reservación por id
  obtenerTipoReservacion(id: String): Observable<any>{
    return this._http.get(this.url + '/getReservationTypeId/' + id, {headers: this.header})
  }

  //Función para obtener a los clientes
  obtenerClientes(): Observable<any>{
    return this._http.get(this.url + '/obtenerClientes', {headers: this.header})
  }

  //Función para obtener los eventos
  obtenerEventos(): Observable<any>{
    return this._http.get(this.url + '/getEvent', {headers: this.header})
  }

  //Función para obtener el evento por id
  obtenerEvento(token, id: String): Observable<any>{
    let headersToken = this.header.set('Authorization', token)

    return this._http.get(this.url + '/getEventId/' + id, {headers: headersToken})
  }

  //Función para agregar un evento
  addEvento(evento: Evento, token): Observable<any>{
    let headersToken = this.header.set('Authorization',token)
    let params = JSON.stringify(evento)

    return this._http.post(this.url + '/addEvento', params, {headers: headersToken})
  }

  //Función para editar el evento
  editEvento(token, evento:Evento): Observable<any>{
    let headersToken = this.header.set('Authorization',token);
    let params = JSON.stringify(evento);

    return this._http.put(this.url + '/editEvento/' + evento._id, params, {headers: headersToken})
  }

  //Función para eliminar un evento
  deleteEvento(token, id: String): Observable<any>{
    let headersToken = this.header.set('Authorization', token);

    return this._http.delete(this.url + '/deleteEvento/' + id, {headers: headersToken})
  }
}
