import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clients'
})
export class ClientsPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length < 3) return value;
    const resultClients = [];
    for(const clients of value){
      if(clients._id.toLowerCase().indexOf(arg.toLowerCase()) > -1 || clients.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 || clients.usuario.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultClients.push(clients)
      }
    }
    return resultClients;
  }

}
