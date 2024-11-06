import { Component } from '@angular/core';
import Restoran from '../models/restoran';
import User from '../models/user';
import { UserService } from '../services/user.service';
import { RestoranService } from '../services/restoran.service';
import { RezervacijaService } from '../services/rezervacija.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restorani',
  templateUrl: './restorani.component.html',
  styleUrls: ['./restorani.component.css']
})
export class RestoraniComponent {
  constructor(private userService: UserService, private restoranService: RestoranService ,private rezervacijaService: RezervacijaService, private router: Router) { }

  restorani: Restoran[] = [];
  ulogovan: User = new User();
  naziv: string = "";
  adresa: string = "";
  tip: string = "";
  restoraniP: Restoran[] = [];
  odabran: Restoran = new Restoran();

  ngOnInit(): void {
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);

    this.restoranService.dohvatiSve().subscribe((restorani) => {
      this.restorani = restorani;
    })
  }

  pretraga() {
    this.restoranService.pretraga(this.naziv,this.adresa,this.tip).subscribe((restorani) => {
      this.restoraniP = restorani;
    })
  }

  vidiDetalje(restoran: Restoran) {
    this.odabran=restoran;
    localStorage.setItem("birani",JSON.stringify(this.odabran));
    this.router.navigate(['detalji']);
  }

}
