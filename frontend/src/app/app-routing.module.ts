import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { KonobarComponent } from './konobar/konobar.component';
import { GostComponent } from './gost/gost.component';
import { NeregistrovaniComponent } from './neregistrovani/neregistrovani.component';
import { AdminComponent } from './admin/admin.component';
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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'gost', component: GostComponent },
  { path: 'konobar', component: KonobarComponent },
  { path: '', component: NeregistrovaniComponent },
  { path: 'loginAdmin', component: LoginAdminComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'profilKonobar', component: ProfilKonobarComponent },
  { path: 'restorani', component: RestoraniComponent },
  { path: 'detalji', component: DetaljiComponent },
  { path: 'korpa', component: KorpaComponent },
  { path: 'rezervacije', component: RezervacijeComponent },
  { path: 'dostava', component: DostavaComponent },
  { path: 'rezervacijeKonobar', component: RezervacijeKonobarComponent },
  { path: 'dostaveKonobar', component: DostaveKonobarComponent },
  { path: 'statistika', component: StatistikaComponent },
  { path: 'dodajKonobara', component: DodajKonobaraComponent },
  { path: 'dodajRestoran', component: DodajRestoranComponent },
  { path: 'azuriranje', component: AzuriranjeComponent },
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
