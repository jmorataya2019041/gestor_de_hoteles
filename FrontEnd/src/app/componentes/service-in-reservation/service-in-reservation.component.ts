import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationType } from 'src/app/modelos/tiporeservacion.model';
import { AdminAppService } from 'src/app/servicios/admin-app.service';

@Component({
  selector: 'app-service-in-reservation',
  templateUrl: './service-in-reservation.component.html',
  styleUrls: ['./service-in-reservation.component.scss'],
  providers: [AdminAppService]
})
export class ServiceInReservationComponent implements OnInit {
  public idReservationTypeGet: String;
  public reservationtypeModel;

  constructor(public _adminAppService: AdminAppService, public _activatedRoute: ActivatedRoute) {
    this.reservationtypeModel = new ReservationType("","",0,[{
      servicio: ''
    }])
   }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.idReservationTypeGet = dataRuta.get('idReservationType')
    })
    this.obtenerReservationTypeId(this.idReservationTypeGet)
  }

  //Función para obtener el tipo de reservación
  obtenerReservationTypeId(idReservationType){
    this._adminAppService.obtenerTipoReservacion(idReservationType).subscribe((response)=>{
      this.reservationtypeModel = response.ReservationType;
      console.log(response);
    },
    error=>{
      console.log(error);
    })
  }

}
