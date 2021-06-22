import { Component, OnInit } from '@angular/core';
import { ReservationType } from 'src/app/modelos/tiporeservacion.model';
import { AdminAppService } from 'src/app/servicios/admin-app.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation-type',
  templateUrl: './reservation-type.component.html',
  styleUrls: ['./reservation-type.component.scss'],
  providers: [AdminAppService, UsuarioService]
})
export class ReservationTypeComponent implements OnInit {
  public reservationType: ReservationType;
  public reservationTypeId: ReservationType;
  public servicios;
  public reservationTypeAdd: ReservationType;
  public modeloServicio = {
    idReservationType: '',
    servicio: ''
  }

  constructor(public _adminAppService: AdminAppService, public _usuarioService: UsuarioService) {
    this.reservationTypeAdd = new ReservationType("","",null,[{
      servicio: ''
    }]),
    this.reservationTypeId = new ReservationType("","",null,[{
      servicio: ''
    }])
   }

  ngOnInit(): void {
    this.obtenerReservationType();
    this.obtenerServicios();
  }

  //Función para obtener los tipo de reservación
  obtenerReservationType(){
    this._adminAppService.obtenerTiposReservacion().subscribe(
      response=>{
        this.reservationType = response.seeReservationType;
        console.log(response);
      },
      error=>{
        console.log(<any>error);

      }
    )
  }

  //Función para obtener el tipo de reservación por id
  obtenerTipoReservacion(idReservationType){
    this._adminAppService.obtenerTipoReservacion(idReservationType).subscribe(
      response=>{
        this.reservationTypeId = response.ReservationType;
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    )
  }

  //Función para obtener los servicios
  obtenerServicios(){
    this._adminAppService.obtenerServicios().subscribe(
      response=>{
        this.servicios = response.serviceSee;
        console.log(response);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //Función para agregar un tipo de reservación
  addReservationType(){
    this._adminAppService.addTipoReservacion(this.reservationTypeAdd).subscribe(
      response=>{
        console.log(response);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Tipo de Reservación Agregado',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })(),
        this.reservationTypeAdd.nombre = '';
        this.reservationTypeAdd.precio = 0;
        this.obtenerReservationType();
      },
      error=>{
        console.log(error);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Error al agregar el tipo de reservación',
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })()
      }
    )
  }

  //Función para agregar servicios al tipo de reservación
  serviceInReservationType(){
    this.modeloServicio.idReservationType = String(this.reservationTypeId._id);
    this._adminAppService.serviceInReservationType(this.modeloServicio).subscribe(
      response=>{
        console.log(response);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Servicio Agregado',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })()
      },
      error=>{
        console.log(error);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Error al agregar el servicio',
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })()
      }
    )
  }

  //Función para eliminar el tipo de reservación
  deleteReservationType(idReservationType){
    this._adminAppService.deleteReservationType(idReservationType).subscribe(
      response=>{
        console.log(response);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Tipo de Reservación eliminado',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })(),
        this.obtenerReservationType();
      },
      error=>{
        console.log(error);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Error al eliminar el Tipo de Reservación',
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
