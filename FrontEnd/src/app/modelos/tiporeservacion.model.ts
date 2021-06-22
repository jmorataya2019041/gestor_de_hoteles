export class ReservationType{
  constructor(
    public _id: String,
    public nombre: String,
    public precio: Number,
    public servicios: [{
      servicio: String
    }]
  ){

  }
}
