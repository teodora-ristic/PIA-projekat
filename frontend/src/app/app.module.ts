import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GostComponent } from './gost/gost.component';
import { KonobarComponent } from './konobar/konobar.component';
import { NeregistrovaniComponent } from './neregistrovani/neregistrovani.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistracijaComponent } from './registracija/registracija.component';
import { ProfilComponent } from './profil/profil.component';
import { ProfilKonobarComponent } from './profil-konobar/profil-konobar.component';
import { RestoraniComponent } from './restorani/restorani.component';
import { DetaljiComponent } from './detalji/detalji.component';
import { KorpaComponent } from './korpa/korpa.component';
import { RezervacijeComponent } from './rezervacije/rezervacije.component';
import { DostavaComponent } from './dostava/dostava.component';
import { RezervacijeKonobarComponent } from './rezervacije-konobar/rezervacije-konobar.component';
import { DostaveKonobarComponent } from './dostave-konobar/dostave-konobar.component';
import { StatistikaComponent } from './statistika/statistika.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { DodajKonobaraComponent } from './dodaj-konobara/dodaj-konobara.component';
import { DodajRestoranComponent } from './dodaj-restoran/dodaj-restoran.component';
import { AzuriranjeComponent } from './azuriranje/azuriranje.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GostComponent,
    KonobarComponent,
    NeregistrovaniComponent,
    AdminComponent,
    RegistracijaComponent,
    ProfilComponent,
    ProfilKonobarComponent,
    RestoraniComponent,
    DetaljiComponent,
    KorpaComponent,
    RezervacijeComponent,
    DostavaComponent,
    RezervacijeKonobarComponent,
    DostaveKonobarComponent,
    StatistikaComponent,
    LoginAdminComponent,
    DodajKonobaraComponent,
    DodajRestoranComponent,
    AzuriranjeComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
