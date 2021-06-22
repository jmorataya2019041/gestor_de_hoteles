import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHotelComponent } from './componentes/add-hotel/add-hotel.component';
import { AddReservationComponent } from './componentes/add-reservation/add-reservation.component';
import { EventosComponent } from './componentes/eventos/eventos.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { ReservationForUserComponent } from './componentes/reservation-for-user/reservation-for-user.component';
import { ReservationTypeComponent } from './componentes/reservation-type/reservation-type.component';
import { ReservationsOfUserComponent } from './componentes/reservations-of-user/reservations-of-user.component';
import { RoomForHotelComponent } from './componentes/room-for-hotel/room-for-hotel.component';
import { RoomForReservationComponent } from './componentes/room-for-reservation/room-for-reservation.component';
import { ServiceInReservationComponent } from './componentes/service-in-reservation/service-in-reservation.component';
import { ServiciosComponent } from './componentes/servicios/servicios.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'perfil-usuario/:idUser', component: PerfilUsuarioComponent},
  {path: 'addHotel', component: AddHotelComponent},
  {path: 'servicios', component: ServiciosComponent},
  {path: 'reservation-type', component: ReservationTypeComponent},
  {path: 'service-in-reservation/:idReservationType', component: ServiceInReservationComponent},
  {path: 'roomForHotel/:idHotel', component: RoomForHotelComponent},
  {path: 'eventos', component: EventosComponent},
  {path: 'addReservation', component: AddReservationComponent},
  {path: 'reservation-for-user/:idUser', component: ReservationForUserComponent},
  {path: 'room-for-reservation/:idReservation', component: RoomForReservationComponent},
  {path: 'reservationOfUser/:idUser', component: ReservationsOfUserComponent},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
