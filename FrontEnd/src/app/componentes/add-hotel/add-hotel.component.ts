import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/modelos/hotel.model';
import { AdminAppService } from 'src/app/servicios/admin-app.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.scss'],
  providers: [UsuarioService]
})
export class AddHotelComponent implements OnInit {
  public getClientes;
  public addHotel: Hotel;

  constructor(private _usuarioService: UsuarioService, private _adminAppService: AdminAppService, public _router: Router) {
    this.addHotel = new Hotel("","","","")
  }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  //Función para obtener los Clientes
  obtenerClientes(){
    this._usuarioService.obtenerClientes().subscribe(
      response=>{
        this.getClientes = response.getClientes;
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    )
  }

  //Función para agregar un hotel
  agregarHotel(){
    this._adminAppService.agregarHotel(this.addHotel).subscribe(
      response=>{
        console.log(response);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Hotel Agregado Exitosamente!',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })(),
        this._router.navigate(['/home'])
      },
      error=>{
        console.log(error);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Error al agregar hotel',
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
