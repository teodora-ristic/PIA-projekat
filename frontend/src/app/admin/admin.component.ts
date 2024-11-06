import { Component, OnInit } from '@angular/core';
import Restoran from '../models/restoran';
import User from '../models/user';
import { UserService } from '../services/user.service';
import { RestoranService } from '../services/restoran.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  constructor(private userService: UserService, private restoranService: RestoranService , private router: Router) { }

  restorani: Restoran[] = [];
  gosti:User[] = [];
  konobari:User[] = [];
  zahtevi:User[] = [];
  ulogovan: User = new User();


  ngOnInit(): void {
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);

    this.userService.dohvatiGoste().subscribe((gosti) => {
      this.gosti = gosti;
    })

    this.userService.dohvatiKonobare().subscribe((konobari) => {
      this.konobari = konobari;
    })

    this.restoranService.dohvatiSve().subscribe((restorani) => {
      this.restorani = restorani;
    })

    this.userService.dohvatiNeobradjene().subscribe((zahtevi) => {
      this.zahtevi = zahtevi;
    })
  }

  prihvati(korisnik: User) {
    this.userService.prihvati(korisnik.korisnickoIme).subscribe((resp) => {
      this.ngOnInit()
    })
  }

  odbij(korisnik: User) {
    this.userService.odbij(korisnik.korisnickoIme).subscribe((resp) => {
      this.ngOnInit()
    })
  }

  dodajKonobara() {
    this.router.navigate(['dodajKonobara']);
  }

  dodajRestoran() {
    this.router.navigate(['dodajRestoran']);
  }

  azuriraj(korisnik: User) {
    localStorage.setItem('azuriraj', JSON.stringify(korisnik));
    this.router.navigate(['azuriranje']);
  }

}
