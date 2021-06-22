import { Component, OnInit } from '@angular/core';
import { Servicios } from 'src/app/modelos/servicios.model';
import { Usuario } from 'src/app/modelos/usuario.model';
import { AdminAppService } from 'src/app/servicios/admin-app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
  providers: [AdminAppService]
})
export class ServiciosComponent implements OnInit {
  public getService;
  public servicio: Servicios;
  public Idservicio: Servicios;

  constructor(public _adminAppService: AdminAppService) {
    this.servicio = new Servicios("","","")
    this.Idservicio = new Servicios("","","")
  }

  ngOnInit(): void {
    this.obtenerServicios()
  }

  //Función obtener los servicios
  obtenerServicios(){
    this._adminAppService.obtenerServicios().subscribe(
      response=>{
        this.getService = response.serviceSee;
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    )
  }

  //Función para obtener un solo servicio
  obtenerServicio(idServicio){
    this._adminAppService.obtenerServicio(idServicio).subscribe(
      response=>{
        this.Idservicio = response.seeService;
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    )
  }

  //Función para agregar un servicio
  addService(){
    this._adminAppService.addService(this.servicio).subscribe(
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
        })(),
        this.obtenerServicios();
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

  //Función para editar el servicio
  editService(){
    this._adminAppService.editService(this.Idservicio).subscribe(
      response=>{
        console.log(response);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Servicio Editado',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })(),
        this.obtenerServicios();
      },
      error=>{
        console.log(error);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Error al editar el servicio',
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })()
      }
    )
  }

  //Función para eliminar el servicio
  deleteService(idServicio){
    this._adminAppService.deleteService(idServicio).subscribe(
      response=>{
        console.log(response);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Servicio Eliminado',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })(),
        this.obtenerServicios();
      },error=>{
        console.log(error);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'El servicio no se ha podido eliminar',
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
