import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario.model';
import { AdminAppService } from 'src/app/servicios/admin-app.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [UsuarioService, AdminAppService]
})
export class UsuariosComponent implements OnInit {
public usuarioModel: Usuario;
public AdminsHotel;
public Clientes;
  constructor(public _usuarioService: UsuarioService, public _adminAppService: AdminAppService) {
    this.usuarioModel = new Usuario("","","","","","")
   }

  seeUsers= '';
  seeClients= '';

  ngOnInit(): void {
    this.obtenerAdminsHotel();
    this.obtenerClientes();
  }

  //Función para obtener los administradores de hotel
  obtenerAdminsHotel(){
    this._usuarioService.obtenerAdminsHotel().subscribe(
      response=>{
        this.AdminsHotel = response.getAdmins;
        console.log(response);
      },
      error=>{
        console.log(error);

      }
    )
  }

  //Función para traer los clientes
  obtenerClientes(){
    this._usuarioService.obtenerClientes().subscribe(
      response=>{
        this.Clientes = response.getClientes;
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    )
  }

  //Función para obtener un usuario por id
  obtenerUsuario(idUser){
    this._adminAppService.obtenerUsuario(idUser).subscribe(
      response=>{
        this.usuarioModel = response.userSee;
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    )
  }

  //Función para editar un usuario
  editUsuario(){
    this._adminAppService.editUser(this.usuarioModel).subscribe(
      response=>{
        console.log(response);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Usuario Editado',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })(),
        this.obtenerAdminsHotel();
        this.obtenerClientes();
      },error=>{
        console.log(error);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'El usuario no se ha podido editar',
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })()
      }
    )
  }

  //Función para eliminar un usuario
  deleteUsuario(idUser){
    this._adminAppService.deleteUser(idUser).subscribe(
      response=>{
        console.log(response);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Usuario Eliminado',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })(),
        this.obtenerAdminsHotel();
        this.obtenerClientes();
      },error=>{
        console.log(error);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Error al eliminar el usuario',
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })(),
        this.obtenerAdminsHotel();
        this.obtenerClientes();
      }
    )
  }
}
