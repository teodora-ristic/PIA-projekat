import { Component, OnInit } from '@angular/core';
import Restoran from '../models/restoran';
import { UserService } from '../services/user.service';
import { RestoranService } from '../services/restoran.service';
import { RezervacijaService } from '../services/rezervacija.service';
import { Router } from '@angular/router';
import User from '../models/user';
import Jelo from '../models/jelo';

@Component({
  selector: 'app-detalji',
  templateUrl: './detalji.component.html',
  styleUrls: ['./detalji.component.css']
})
export class DetaljiComponent implements OnInit{

  birani: Restoran = new Restoran();
  ulogovan: User = new User();
  datum_vreme: Date = new Date();
  broj: number = 0;
  zahtevi: string = "";

  constructor(private userService: UserService, private restoranService: RestoranService ,private rezervacijaService: RezervacijaService, private router: Router) { }
  ngOnInit(): void {
    let birani = localStorage.getItem('birani');
    if (birani != null) this.birani = JSON.parse(birani);
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);
    this.restoranService.dohvatiPoNazivu(this.birani.naziv).subscribe(r => {
      this.birani = r
    })
  }

  rezervacija() {
    let rezervisano = false;

    for (let i = 0; i < this.birani.radno_vreme.length; i++) {
        let radno = this.birani.radno_vreme[i];

        let trazeni = new Date(this.datum_vreme);
        let dan = trazeni.getDay();
        let vreme = trazeni.getHours();
        let min = trazeni.getMinutes();

        if (radno.dan == dan && radno.vreme_od <= vreme &&
          (radno.vreme_do - 3 > vreme || (radno.vreme_do - 3 == vreme && min==0))) {
            for (let j = 0; j < this.birani.stolovi.length; j++) {
                let sto = this.birani.stolovi[j];

                if (sto.brojOsoba >= this.broj && sto.status == "slobodan") {
                    rezervisano = true;
                    break;
                }
            }
        }

        if (rezervisano) {
            break;
        }
    }

    if (rezervisano) {
      alert('Rezervacija je uspešno izvršena!');
    } else {
      alert('Nije moguće izvršiti rezervaciju u traženom terminu.');
    }

    if(rezervisano){
      this.rezervacijaService.dodajRezervaciju(this.datum_vreme,this.ulogovan.ime,this.ulogovan.prezime,this.ulogovan.korisnickoIme,this.birani.naziv,
        this.birani.adresa,this.broj,this.zahtevi
      ).subscribe((resp) => {
        this.ngOnInit();
      })
  }

  }

  dodaj(jelo: Jelo) {
    for (let i = 0; i < jelo.kolicina; i++) {
      this.userService.dodajUKorpu(jelo,this.ulogovan.korisnickoIme).subscribe((resp) => {
      })
    }
    alert("Jelo " + jelo.naziv + " dodato u korpu x" + jelo.kolicina)
  }

  pregledKorpe() {
    this.router.navigate(['korpa']);
  }



}
