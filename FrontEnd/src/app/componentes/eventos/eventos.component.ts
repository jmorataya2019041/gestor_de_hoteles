import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/modelos/evento.model';
import { AdminAppService } from 'src/app/servicios/admin-app.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  providers: [AdminAppService, UsuarioService]
})
export class EventosComponent implements OnInit {
  public token = this._usuarioService.getToken();
  public getEventos: Evento;
  public getEventoId: Evento;
  public eventoAdd: Evento;

  constructor(public _adminAppService: AdminAppService, public _usuarioService: UsuarioService) {
    this.eventoAdd = new Evento("","","");
    this.getEventoId = new Evento("","","")
   }

  ngOnInit(): void {
    this.obtenerEventos();
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

  //Función para obtener el evento por id
  obtenerEventoId(idEvento){
    this._adminAppService.obtenerEvento(this.token, idEvento).subscribe(
      response=>{
        this.getEventoId = response.getEvento;
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    )
  }

  //Función para agregar un evento
  addEvento(){
    this._adminAppService.addEvento(this.eventoAdd, this.token).subscribe(
      response=>{
        console.log(response);
        console.log(response);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Evento Agregado',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })(),
        this.eventoAdd.nombre = '';
        this.eventoAdd.descripcion = '';
        this.obtenerEventos();
      },
      error=>{
        console.log(error);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Error al agregar el evento',
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })()
      }
    )
  }

  //Función para editar el evento
  editEvento(){
    this._adminAppService.editEvento(this.token, this.getEventoId).subscribe(
      response=>{
        console.log(response);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Evento Editado',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })(),
        this.obtenerEventos();
      },
      error=>{
        console.log(error);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Error al editar el evento',
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })()
      }
    )
  }

  //Función para eliminar un evento
  deleteEvento(idEvento){
    this._adminAppService.deleteEvento(this.token, idEvento).subscribe(
      response=>{
        console.log(response);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Evento Eliminado',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })(),
        this.obtenerEventos()
      },
      error=>{
        console.log(<any>error);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Error al eliminar el evento',
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
