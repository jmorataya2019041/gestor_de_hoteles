import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminAppService } from 'src/app/servicios/admin-app.service';
import { AdminHotelService } from 'src/app/servicios/admin-hotel.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-reservations-of-user',
  templateUrl: './reservations-of-user.component.html',
  styleUrls: ['./reservations-of-user.component.scss'],
  providers: [UsuarioService, AdminHotelService]
})
export class ReservationsOfUserComponent implements OnInit {
  public ReservationModel;
  public IdusuarioRuta: String;

  constructor(public _usuarioService: UsuarioService, public _adminHotelService: AdminHotelService, public _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.IdusuarioRuta = dataRuta.get('idUser')
    }),
    this.reservationOfUser(this.IdusuarioRuta)
  }
  //Función para obtener las reservaciones por usuario
  reservationOfUser(idUser){
    this._adminHotelService.reservationOfUser(idUser).subscribe(
      response=>{
        this.ReservationModel = response.seeReservacion;
        console.log(response);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
