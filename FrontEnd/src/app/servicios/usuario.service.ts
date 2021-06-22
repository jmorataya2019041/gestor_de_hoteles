import { Injectable, ɵɵqueryRefresh } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../modelos/usuario.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Global } from "./Global.service";
import { Router } from '@angular/router';
import { Reservation } from '../modelos/reservacion.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url: String;
  public identidad;
  public token;
  public header = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient, public _router: Router) {
    this.url = Global.url;
   }

   //Función para registrar un nuevo usuario
   registrar(usuario): Observable<any>{
     let params = JSON.stringify(usuario);

     return this._http.post(this.url + '/Registro' , params, {headers: this.header})
   }

   //Función para login
   login(usuario, getToken = null): Observable<any>{
     if(getToken != null){
       usuario.getToken = getToken;
     }

     let params = JSON.stringify(usuario);

    return this._http.post(this.url + '/login', params, {headers: this.header})
   }

   //Obtener la identidad del usuario
   getIdentidad(){
     var identidad2 = JSON.parse(sessionStorage.getItem('identidad'));
     if(identidad2 != 'undefined'){
       this.identidad = identidad2;
     }else{
       this.identidad = null
     }

     return this.identidad;
   }

   //Función para obtener el token
   getToken(){
     var token2 = sessionStorage.getItem('token');
     if(token2 != 'undefined'){
       this.token = token2;
     }else{
       this.token = null;
     }

     return this.token;
   }

   //Función para obtener los Hoteles
   obtenerHoteles(): Observable<any>{
     return this._http.get(this.url + '/getHoteles', {headers: this.header})
   }

   //Función para obtener los administradores de Hotel
   obtenerAdminsHotel(): Observable<any>{
     return this._http.get(this.url + '/obtenerAdminHotel', {headers: this.header})
   }

   //Función para obtener a los clientes
   obtenerClientes(): Observable<any>{
     return this._http.get(this.url + '/obtenerClientes', {headers: this.header})
   }

   //Función para obtener todos los usuarios
   obtenerUsuarios(): Observable<any>{
     return this._http.get(this.url + '/obtenerUsuarios', {headers: this.header})
   }

   //Función para cerrar sesión
   logout(){
     sessionStorage.removeItem('identidad')
     sessionStorage.removeItem('token')
     this._router.navigate(['/login'])
   }

   //Obtener el usuario por id
   obtenerUserId(id:String): Observable<any>{
     return this._http.get(this.url + '/getUserId/'+ id, {headers: this.header})
   }

   //Función para editar el usuario
   editarPerfil(usuario: Usuario): Observable<any>{
     let params = JSON.stringify(usuario);
     let headersToken = this.header.set('Authorization', this.getToken())

     return this._http.put(this.url + '/editarRegistro/'+ usuario._id , params, {headers: headersToken})
   }

   //Función para eliminar el perfil
   eliminarPerfil(id: String): Observable<any>{
     let headersToken = this.header.set('Authorization', this.getToken())
     sessionStorage.removeItem('identidad');
     sessionStorage.removeItem('token');

     return this._http.delete(this.url + '/eliminarRegistro/' + id, {headers: headersToken})
   }

   //Función para ver las habitaciones por hotel
   roomForHotel(id: String): Observable<any>{
     return this._http.get(this.url + '/roomHotel/' + id, {headers: this.header})
   }

   //Función para crear una reservación
   addReservation(token, reservacion): Observable<any>{
     let headersToken = this.header.set('Authorization', token)
     let params = JSON.stringify(reservacion);

     return this._http.post(this.url + '/addReservacion', params, {headers: headersToken})
   }

   //Función para obtener las reservaciones por usuario
   reservationforUser(token, id: String): Observable<any>{
     let headersToken = this.header.set('Authorization', token)

     return this._http.get(this.url + '/seeReservations/' + id, {headers: headersToken})
   }

   //Función para obtener las habitaciones disponibles
   roomDisponibility(): Observable<any>{
     return this._http.get(this.url + '/roomDisponibility', {headers: this.header})
   }

   //Función para obtener el id de la reservación
   reservationId(id: String): Observable<any>{
     return this._http.get(this.url + '/reservationId/' + id, {headers: this.header})
   }

   //Función para agregar una habitación a la reservación
   addRoominReservation(modeloRoom): Observable<any>{
     let params = JSON.stringify(modeloRoom);

     return this._http.put(this.url + '/addRoomReservation/' + modeloRoom.idReservation, params, {headers: this.header})
   }

   //Función para eliminar la reservación
   deleteReservation(id: String): Observable<any>{
     return this._http.delete(this.url + '/deleteReservation/' + id, {headers: this.header})
   }

   //Función para editar la reservación
   editReservation(reservacion: Reservation): Observable<any>{
     let params = JSON.stringify(reservacion)

     return this._http.put(this.url + '/editReservation/' + reservacion._id, params, {headers: this.header})
   }
}
