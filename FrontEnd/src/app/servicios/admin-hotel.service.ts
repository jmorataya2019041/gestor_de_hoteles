import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Habitacion } from '../modelos/habitacion.model';
import { Global } from "./Global.service";
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminHotelService {
  public url: String;
  public header = new HttpHeaders().set('Content-Type', 'application/json');
  public token = this._usuarioService.getToken();

  constructor(public _http: HttpClient, public _usuarioService: UsuarioService) {
    this.url = Global.url;
   }

   //Función para obtener una habitación
   obtenerHabitacion(token, id:String): Observable<any>{
     let headersToken = this.header.set('Authorization', token)

     return this._http.get(this.url + '/seeRoomId/' + id, {headers: headersToken})
   }

   //Función para agregar una habitación
   addRoom(token, habitacion: Habitacion): Observable<any>{
     let headersToken = this.header.set('Authorization', token);
     let params = JSON.stringify(habitacion);

     return this._http.post(this.url + '/addRoom', params, {headers: headersToken})
   }

   //Función para editar la habitación
   editRoom(token, habitacion: Habitacion): Observable<any>{
     let headersToken = this.header.set('Authorization', token);
     let params = JSON.stringify(habitacion);

     return this._http.put(this.url + '/editRoom/' + habitacion._id, params, {headers: headersToken})
   }

   //Función para eliminar la habitación
   deleteRoom(token, id: String): Observable<any>{
     let headersToken = this.header.set('Authorization', token)

     return this._http.delete(this.url + '/deleteRoom/' + id, {headers: headersToken})
   }

   //Función para obtener las reservaciones de un usuario
   reservationOfUser(id: String): Observable<any>{
     return this._http.get(this.url + '/reservationsUser/' + id, {headers: this.header})
   }
}
