import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NameHotelPipe } from './pipes/name-hotel.pipe';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { UsersPipe } from './pipes/users.pipe';
import { ClientsPipe } from './pipes/clients.pipe';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { AddHotelComponent } from './componentes/add-hotel/add-hotel.component';
import { ServiciosComponent } from './componentes/servicios/servicios.component';
import { ReservationTypeComponent } from './componentes/reservation-type/reservation-type.component';
import { ServiceInReservationComponent } from './componentes/service-in-reservation/service-in-reservation.component';
import { RoomForHotelComponent } from './componentes/room-for-hotel/room-for-hotel.component';
import { EventosComponent } from './componentes/eventos/eventos.component';
import { AddReservationComponent } from './componentes/add-reservation/add-reservation.component';
import { ReservationForUserComponent } from './componentes/reservation-for-user/reservation-for-user.component';
import { RoomForReservationComponent } from './componentes/room-for-reservation/room-for-reservation.component';
import { ReservationsOfUserComponent } from './componentes/reservations-of-user/reservations-of-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    NameHotelPipe,
    UsuariosComponent,
    UsersPipe,
    ClientsPipe,
    PerfilUsuarioComponent,
    AddHotelComponent,
    ServiciosComponent,
    ReservationTypeComponent,
    ServiceInReservationComponent,
    RoomForHotelComponent,
    EventosComponent,
    AddReservationComponent,
    ReservationForUserComponent,
    RoomForReservationComponent,
    ReservationsOfUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
