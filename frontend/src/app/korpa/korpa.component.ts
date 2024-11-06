import { Component, OnInit } from '@angular/core';
import Jelo from '../models/jelo';
import User from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { DostavaService } from '../services/dostava.service';
import Restoran from '../models/restoran';

@Component({
  selector: 'app-korpa',
  templateUrl: './korpa.component.html',
  styleUrls: ['./korpa.component.css']
})
export class KorpaComponent implements OnInit{
  ulogovan: User = new User();
  birani: Restoran = new Restoran();

  constructor(private userService:UserService,private dostavaService: DostavaService, private router:Router) {}

  ngOnInit(): void {
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);
    let birani = localStorage.getItem('birani');
    if (birani != null) this.birani = JSON.parse(birani);

    this.userService.getUser(this.ulogovan.korisnickoIme).subscribe(u => {
      this.ulogovan = u
    })
  }

  zavrsiPorudzbinu() {
    let racun = 0;
    this.ulogovan.korpa.forEach(jelo => {
      racun+=jelo.cena;
    });
    this.userService.isprazniKorpu(this.ulogovan.korisnickoIme).subscribe(u => {

    })
    this.dostavaService.dodaj(this.ulogovan.korisnickoIme,this.birani.naziv,racun).subscribe(d => {

    })
    this.router.navigate(['detalji']);
  }

}
