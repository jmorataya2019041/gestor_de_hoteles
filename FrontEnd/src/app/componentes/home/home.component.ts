import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/modelos/hotel.model';
import { AdminAppService } from 'src/app/servicios/admin-app.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UsuarioService, AdminAppService]
})
export class HomeComponent implements OnInit {
  public hotelId: Hotel;
  public hoteles;
  public clientes;

  constructor(public _usuarioService: UsuarioService, public _adminAppService: AdminAppService) {
    this.hotelId = new Hotel("","","","")
  }

  nombreHotel = '';

  ngOnInit(): void {
    this.obtenerHoteles();
    this.obtenerClientes();
  }

  //Función para obtener los Hoteles
  obtenerHoteles(){
    this._usuarioService.obtenerHoteles().subscribe(
      response=>{
        this.hoteles = response.getHoteles;
        console.log(response);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //Función para obtener un hotel
  obtenerHotelId(idHotel){
    this._adminAppService.hotelId(idHotel).subscribe(
      response=>{
        this.hotelId = response.hotel;
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    )
  }

  //Función para editar el hotel
  editarHotel(){
    this._adminAppService.editarHotel(this.hotelId).subscribe(
      response=>{
        console.log(response);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Hotel Editado Exitosamente!',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })(),
        this.obtenerHoteles();
      },
      error=>{
        console.log(error);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Error al editar el hotel',
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })()
      }
    )
  }

  //Función para eliminar el hotel
  eliminarHotel(idHotel){
    this._adminAppService.eliminarHotel(idHotel).subscribe(
      response=>{
        console.log(response);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Hotel Eliminado Exitosamente!',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })(),
        this.obtenerHoteles();
      },
      error=>{
        console.log(error);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Error al eliminar el hotel',
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })()
      }
    )
  }

  //Función para obtener los clientes
  obtenerClientes(){
    this._adminAppService.obtenerClientes().subscribe(
      response=>{
        this.clientes = response.getClientes;
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    )
  }

}
