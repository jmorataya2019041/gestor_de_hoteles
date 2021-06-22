import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/modelos/evento.model';
import { Reservation } from 'src/app/modelos/reservacion.model';
import { ReservationType } from 'src/app/modelos/tiporeservacion.model';
import { AdminAppService } from 'src/app/servicios/admin-app.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss'],
  providers: [UsuarioService, AdminAppService]
})
export class AddReservationComponent implements OnInit {
  public getEventos;
  public getReservationType;
  public reservationAdd: Reservation;
  public token = this._usuarioService.getToken();


  constructor(public _usuarioService: UsuarioService, public _adminAppService: AdminAppService) {
    this.reservationAdd = new Reservation("",null,null,"","",[{
      room: ""
    }],null,"")
   }

  ngOnInit(): void {
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

  //Función para agregar una reservación
  addReservation(){
    this._usuarioService.addReservation(this.token, this.reservationAdd).subscribe(
      response=>{
        console.log(response);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Reservación Agregada',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })(),
        this.reservationAdd = new Reservation("",null,null,"","",[{room:""}],null,"")
      },
      error=>{
        console.log(<any>error);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Error al agregar la reservación',
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
