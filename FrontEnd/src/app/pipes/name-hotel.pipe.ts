import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameHotel'
})
export class NameHotelPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.length < 2 ) return value;
    const resultnameHotel = [];
    for(const hoteles of value){
      if(hoteles.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 || hoteles.direccion.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultnameHotel.push(hoteles)
      }
    }
    return resultnameHotel;
  }

}
