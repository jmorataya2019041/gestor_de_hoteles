import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/modelos/reservacion.model';
import { AdminAppService } from 'src/app/servicios/admin-app.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation-for-user',
  templateUrl: './reservation-for-user.component.html',
  styleUrls: ['./reservation-for-user.component.scss'],
  providers: [UsuarioService, AdminAppService]
})
export class ReservationForUserComponent implements OnInit {
  public token = this._usuarioService.getToken();
  public reservationforuserModel;
  public getReservaciones;
  public reservationId: Reservation;
  public idUserRuta: String;
  public roomDisponibles;
  public getEventos;
  public getReservationType;
  public modeloRoom = {
    idReservation: '',
    room: ''
  }

  constructor(public _usuarioService: UsuarioService, public _adminAppService: AdminAppService, public _activatedRoute: ActivatedRoute) {
    this.reservationId = new Reservation("",null,null,"","",[{room: ''}],null,"")
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.idUserRuta = dataRuta.get('idUser')
    }),
    this.getReservationForUser(this.idUserRuta)
    this.roomDisponibility();
    this.obtenerTypeReservation();
    this.obtenerEventos();
  }

  //Función para obtener los tipos de reservación
  obtenerTypeReservation(){
    this._adminAppService.obtenerTiposReservacion().subscribe(
      response=>{
        this.getReservationType = response.seeReservationType;
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    )
  }

  //Función para obtener los eventos
  obtenerEventos(){
    this._adminAppService.obtenerEventos().subscribe(
      response=>{
        this.getEventos = response.getEvents;
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    )
  }

  //Función para obtener las reservaciones por usuario
  getReservationForUser(idUser){
    this._usuarioService.reservationforUser(this.token, idUser).subscribe(
      response=>{
        this.reservationforuserModel = response.seeReservation;
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    )
  }

  //Función para obtener las habitaciones disponibles
  roomDisponibility(){
    this._usuarioService.roomDisponibility().subscribe(
      response=>{
        this.roomDisponibles = response.roomdisponibility;
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    )
  }

  //Función para obtener la reservación por id
  reservationforId(idReservation){
    this._usuarioService.reservationId(idReservation).subscribe(
      response=>{
        this.reservationId = response.reservationSee;
        console.log(response);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //Función para agregar habitaciones a la reservación
  addRoominReservation(){
    this.modeloRoom.idReservation = String(this.reservationId._id);
    this._usuarioService.addRoominReservation(this.modeloRoom).subscribe(
      response=>{
        console.log(response);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Habitación agregada',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })()
      },
      error=>{
        console.log(<any>error);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'No se ha podido agregar la habitación',
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })()
      }
    )
  }

  //Función para eliminar la reservación
  deleteReservation(idReservation){
    this._usuarioService.deleteReservation(idReservation).subscribe(
      response=>{
        console.log(response);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Reservación Eliminada',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })(),
        this.getReservationForUser(this.idUserRuta);
      },
      error=>{
        console.log(<any>error);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Error al eliminar la reservación',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })()
      }
    )
  }

  //Función para editar la reservación
  editReservation(){
    this._usuarioService.editReservation(this.reservationId).subscribe(
      response=>{
        console.log(response);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Reservación Editada',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })(),
        this.getReservationForUser(this.idUserRuta);
      },
      error=>{
        console.log(<any>error);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Error al editar la reservación',
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })()
      }
    )
  }

}
