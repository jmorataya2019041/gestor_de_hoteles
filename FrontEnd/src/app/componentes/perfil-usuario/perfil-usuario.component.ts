import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss'],
  providers: [UsuarioService]
})
export class PerfilUsuarioComponent implements OnInit {
  public usuarioModel: Usuario;
  public idUserRuta: String;
  public idUsuarioModel: Usuario;
  public usuarios;
  public token;

  constructor(public _usuarioService: UsuarioService, public _activatedRoute: ActivatedRoute, private _router: Router) {
    this.token = this._usuarioService.getToken();
  }

  ngOnInit(): void {
    //obtener el id
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.idUserRuta = dataRuta.get('idUser')
    });
    this.obtenerUserId(this.idUserRuta)
    this.idUsuarioModel = new Usuario("","","","","","")
  }

  //Otra manera de navegar con parámetros
  obtenerUserId(idUser){
    this._usuarioService.obtenerUserId(idUser).subscribe(
      response=>{
        this.usuarioModel = response.getUser;
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    )
  }

  //Obtener el id del usuario
  obtenerUsuarioId(idUsuario){
    this._usuarioService.obtenerUserId(idUsuario).subscribe(
      response=>{
        this.idUsuarioModel = response.getUser;
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    )
  }

  //Función para editar perfil
  editarPerfil(){
    this._usuarioService.editarPerfil(this.idUsuarioModel).subscribe(
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
        })()
        this.obtenerUserId(this.idUserRuta)
      },
      error=>{
        console.log(error);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Error al editar',
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })()
      }
    )
  }

  //Función para eliminar el perfil
  eliminarPerfil(idUsuario){
    this._usuarioService.eliminarPerfil(idUsuario).subscribe(
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
        })()
        this._router.navigate(['/login'])
      },
      error=>{
        console.log(error);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Error al eliminar',
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
