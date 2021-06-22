export class Reservation{
  constructor(
    public _id: String,
    public fechaInicio: Date,
    public fechaFinal: Date,
    public tipoReservacion: String,
    public evento: String,
    public rooms: [{
      room: String
    }],
    public total: Number,
    public usuario: String
  ){

  }
}
