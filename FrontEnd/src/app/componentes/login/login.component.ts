import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Usuario } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {
  public user:Usuario;
  public userAdd: Usuario
  public token;
  public identidad;

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.user = new Usuario("","","","","","");
    this.userAdd = new Usuario("","","","","","");
  }

  ngOnInit(): void {
  }

  //Función para registrar usuario
  registrar(){
    this._usuarioService.registrar(this.userAdd).subscribe(
      response=>{
        console.log(response);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Usuario Agregado',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })()
        this.userAdd = new Usuario("","","","","","");
      },
      error=>{
        console.log(<any>error);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: "Error al agregar el usuario",
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })()
      }
    )
  }

  //Función para obtener el Token
  getToken(){
    this._usuarioService.login(this.user, 'true').subscribe(
      response=>{
        this.token = response.token;
        sessionStorage.setItem('token', this.token);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //Función para el login
  login(){
    this._usuarioService.login(this.user).subscribe(
      response=>{
        this.identidad = response.userSee;
        sessionStorage.setItem('identidad', JSON.stringify(this.identidad));
        this.getToken();
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Login Successful',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })()
        this._router.navigate(['/home'])
      },
      error=>{
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Email or Password incorrect',
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
