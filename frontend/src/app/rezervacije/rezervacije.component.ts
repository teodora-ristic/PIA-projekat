import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { RezervacijaService } from '../services/rezervacija.service';
import { Router } from '@angular/router';
import User from '../models/user';
import Rezervacija from '../models/rezervacija';
import { RestoranService } from '../services/restoran.service';
import Restoran from '../models/restoran';

@Component({
  selector: 'app-rezervacije',
  templateUrl: './rezervacije.component.html',
  styleUrls: ['./rezervacije.component.css']
})
export class RezervacijeComponent implements OnInit{

  constructor(private userService: UserService,private rezervacijaService: RezervacijaService,private router: Router) { }

  ulogovan: User = new User();
  aktuelne: Rezervacija[] = []
  istekle: Rezervacija[] = []


  ngOnInit(): void {
    let danas = new Date();
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);
    this.rezervacijaService.dohvatiZaKorisnika(this.ulogovan.korisnickoIme).subscribe((rezervacije) => {
      rezervacije.forEach(r => {
        let datum = new Date(r.datum_vreme);
        if(datum>=danas) {
          this.aktuelne.push(r);
        } else {
          this.istekle.push(r);
        }
      });
      this.istekle.sort((a1, a2) => {
        return new Date(a2.datum_vreme).getTime() - new Date(a1.datum_vreme).getTime();
      });
    })


  }
}
