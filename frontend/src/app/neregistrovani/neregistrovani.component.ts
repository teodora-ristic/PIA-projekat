import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import User from '../models/user';
import { RestoranService } from '../services/restoran.service';
import { RezervacijaService } from '../services/rezervacija.service';
import Restoran from '../models/restoran';
import Rezervacija from '../models/rezervacija';

@Component({
  selector: 'app-neregistrovani',
  templateUrl: './neregistrovani.component.html',
  styleUrls: ['./neregistrovani.component.css']
})
export class NeregistrovaniComponent {
  constructor(private userService: UserService, private restoranService: RestoranService ,private rezervacijaService: RezervacijaService, private router: Router) { }

  korisnickoIme: string = "";
  nova: string = "";
  nova2: string = "";
  stara: string = "";
  brRestorana: Number = 0;
  brGostiju: Number = 0;
  brSedamDana: number = 0;
  brDan: number = 0;
  brMesec: number = 0;
  restorani: Restoran[] = [];
  ulogovan: User = new User();
  naziv: string = "";
  adresa: string = "";
  tip: string = "";
  restoraniP: Restoran[] = [];
  rezervacije: Rezervacija[] = [];

  ngOnInit(): void {
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);

    this.restoranService.broj().subscribe((cnt) => {
      this.brRestorana = cnt;
    })

    this.userService.broj().subscribe((cnt) => {
      this.brGostiju = cnt;
    })

    this.restoranService.dohvatiSve().subscribe((restorani) => {
      this.restorani = restorani;
    })

    this.rezervacijaService.dohvatiSve().subscribe((rezervacije) => {
      this.rezervacije = rezervacije;
      let danas = new Date();
      let juce = new Date(danas.getTime() - 24*60*60*1000);
      let sedamDana = new Date(danas.getTime() - 7*24*60*60*1000);
      let mesecDana = new Date();
      mesecDana.setMonth(mesecDana.getMonth()-1)

      this.rezervacije.forEach(r => {
        let datum = new Date(r.datum_vreme)
        if (datum>=juce && datum<danas) {
          this.brDan=this.brDan+1;
        }
        if (datum>=sedamDana && datum<danas) {
          this.brSedamDana=this.brSedamDana+1;
        }
        if (datum>=mesecDana && datum<danas) {
          this.brMesec=this.brMesec+1;
        }
      });
    })


  }

  promeniLozinku() {
    if (this.nova == this.nova2) {
      let regex = new RegExp(/^(?=(.*[a-z]){3})(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z][A-Za-z\d!@#$%^&*]{5,9}$/);
      if (regex.test(this.nova)==true) {
        this.userService.promeniLozinku(this.korisnickoIme,this.stara,this.nova).subscribe((resp) => {
            if (resp) {
              alert("Promenjena lozinka")
              this.router.navigate(['login']);
            } else {
              alert("Pogresno korisnicko ime ili stara lozinka")
            }
        })
      } else {
        alert("Lozinka nije u dobrom formatu.")
      }
    }
    else {
      alert("Niste dva puta uneli istu lozinku")
    }
  }

  sortirajPoNazivuAsc() {
    this.restoranService.sortirajPoNazivuAsc().subscribe((restorani) => {
      this.restorani = restorani;
    })
  }

  sortirajPoNazivuDesc() {
    this.restoranService.sortirajPoNazivuDesc().subscribe((restorani) => {
      this.restorani = restorani;
    })
  }

  sortirajPoAdresiAsc() {
    this.restoranService.sortirajPoAdresiAsc().subscribe((restorani) => {
      this.restorani = restorani;
    })
  }

  sortirajPoAdresiDesc() {
    this.restoranService.sortirajPoAdresiDesc().subscribe((restorani) => {
      this.restorani = restorani;
    })
  }

  sortirajPoTipuAsc() {
    this.restoranService.sortirajPoTipuAsc().subscribe((restorani) => {
      this.restorani = restorani;
    })
  }

  sortirajPoTipuDesc() {
    this.restoranService.sortirajPoTipuDesc().subscribe((restorani) => {
      this.restorani = restorani;
    })
  }

  pretraga() {
    this.restoranService.pretraga(this.naziv,this.adresa,this.tip).subscribe((restorani) => {
      this.restoraniP = restorani;
    })
  }
}
