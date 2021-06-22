import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'users'
})
export class UsersPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length < 3) return value;
    const resultado = [];
    for(const users of value){
      if(users.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 || users.email.toLowerCase().indexOf(arg.toLowerCase()) > -1|| users.usuario.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultado.push(users)
      }
    }
    return resultado;
  }

}
