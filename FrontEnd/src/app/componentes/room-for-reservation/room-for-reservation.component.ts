import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/modelos/reservacion.model';
import { AdminAppService } from 'src/app/servicios/admin-app.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-room-for-reservation',
  templateUrl: './room-for-reservation.component.html',
  styleUrls: ['./room-for-reservation.component.scss'],
  providers: [UsuarioService, AdminAppService]
})
export class RoomForReservationComponent implements OnInit {
  public idReservationGet: String;
  public reservationModel;

  constructor(public _usuarioService: UsuarioService, public _adminAppService: AdminAppService, public _activatedRoute: ActivatedRoute) {
    this.reservationModel = new Reservation("",null,null,"","",[{room:''}],null,"")
   }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.idReservationGet = dataRuta.get('idReservation')
    }),
    this.obtenerReservacion(this.idReservationGet)
  }

  //Función para obtener la reservación
  obtenerReservacion(idReservation){
    this._usuarioService.reservationId(idReservation).subscribe((response)=>{
      this.reservationModel = response.reservationSee;
      console.log(response);
    },
    error=>{
      console.log(<any>error);

    })
  }

}
