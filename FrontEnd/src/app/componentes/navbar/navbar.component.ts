import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [UsuarioService]
})
export class NavbarComponent implements OnInit {
  public getUserId: Usuario;
  public users;

  constructor(public _usuarioService: UsuarioService, public _router: Router) {
   }

  ngOnInit(): void {
  }

  //Función para obtener un usuario por id
  obtenerUsuario(idUser){
    this._usuarioService.obtenerUserId(idUser).subscribe(
      response=>{
        this.getUserId = response.getUser;
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    )
  }

  //Navegar a el perfil del usuario
  navegarPerfilUser(idUser){
    this._router.navigate(['/perfil-usuario', idUser])
  }
}
