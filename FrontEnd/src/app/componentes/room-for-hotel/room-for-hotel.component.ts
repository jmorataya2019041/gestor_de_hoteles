import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evento } from 'src/app/modelos/evento.model';
import { Habitacion } from 'src/app/modelos/habitacion.model';
import { Hotel } from 'src/app/modelos/hotel.model';
import { AdminAppService } from 'src/app/servicios/admin-app.service';
import { AdminHotelService } from 'src/app/servicios/admin-hotel.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room-for-hotel',
  templateUrl: './room-for-hotel.component.html',
  styleUrls: ['./room-for-hotel.component.scss'],
  providers: [UsuarioService, AdminAppService, AdminHotelService]
})
export class RoomForHotelComponent implements OnInit {
  public habitacionModel: Habitacion;
  public getEventos;
  public hotel;
  public idHotelRuta: String;
  public token = this._usuarioService.getToken();
  public habitacionGetId: Habitacion;
  public habitacionAdd: Habitacion;
  public getHoteles;

  constructor(public _usuarioService: UsuarioService, public _adminAppService: AdminAppService, public _adminHotelService: AdminHotelService, public _activatedRoute: ActivatedRoute) {
    this.getEventos = new Evento("","","");
    this.hotel = new Hotel("","","","")
    this.habitacionGetId = new Habitacion("","",null, null,"")
    this.habitacionAdd = new Habitacion("","",0,true,"")
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.idHotelRuta = dataRuta.get('idHotel');
    });
    this.roomForHotel(this.idHotelRuta);
    this.obtenerHotel(this.idHotelRuta)
    this.obtenerEventos();
  }

  //Función para obtener las habitaciones por hotel
  roomForHotel(idHotel){
    this._usuarioService.roomForHotel(idHotel).subscribe(
      response=>{
        this.habitacionModel = response.roomHotel;
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    )
  }

  //Función para obtener el hotel por id
  obtenerHotel(idHotel){
    this._adminAppService.hotelId(idHotel).subscribe(
      response=>{
        this.hotel = response.hotel;
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

  //Función para obtener la habitación
  obtenerHabitacion(idHabitacion){
    this._adminHotelService.obtenerHabitacion(this.token, idHabitacion).subscribe(
      response=>{
        this.habitacionGetId = response.roomSee;
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    )
  }

  //Función para agregar una Habitación
  addRoom(){
    this._adminHotelService.addRoom(this.token, this.habitacionAdd).subscribe(
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
        })(),
        this.roomForHotel(this.idHotelRuta);
      },
      error=>{
        console.log(error);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Error al agregar la habitación',
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })()
      }
    )
  }

  //Función para editar la habitación
  editRoom(){
    this._adminHotelService.editRoom(this.token, this.habitacionGetId).subscribe(
      response=>{
        console.log(response);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Habitación Editada',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })(),
        this.roomForHotel(this.idHotelRuta);
      },
      error=>{
        console.log(error);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Error al editar la habitación',
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })()
      }
    )
  }

  //Función para eliminar la habitación
  deleteRoom(idRoom){
    this._adminHotelService.deleteRoom(this.token, idRoom).subscribe(
      response=>{
        console.log(response);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Habitación Eliminada',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })(),
        this.roomForHotel(this.idHotelRuta);
      },
      error=>{
        console.log(error);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Error al eliminar la habitación',
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
