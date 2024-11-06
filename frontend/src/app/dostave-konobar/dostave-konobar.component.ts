import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { DostavaService } from '../services/dostava.service';
import { Router } from '@angular/router';
import User from '../models/user';
import Dostava from '../models/dostava';

@Component({
  selector: 'app-dostave-konobar',
  templateUrl: './dostave-konobar.component.html',
  styleUrls: ['./dostave-konobar.component.css']
})
export class DostaveKonobarComponent {
  constructor(private userService: UserService,private dostavaService: DostavaService,private router: Router) { }

  ulogovan: User = new User();
  aktuelne: Dostava[] = []
  vremeOd: number = 0;
  vremeDo: number = 0;

  ngOnInit(): void {
    let danas = new Date();
    let preSat = new Date(danas.getTime()-60*60*1000)
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);
    this.aktuelne=[];
    this.dostavaService.dohvatiZaRestoran(this.ulogovan.restoran).subscribe((dostave) => {

      dostave.forEach(d => {
        /*
        let datum = new Date(d.datum);
        if(datum>=preSat) {
          this.aktuelne.push(d);
        }*/
        if(d.status=="neobradjena") {
          this.aktuelne.push(d);
        }
      });
    })



  }

  potvrdi(dostava: Dostava) {
    this.dostavaService.potvrdi(this.vremeOd,dostava).subscribe((resp) => {
      this.ngOnInit();
    })
  }

  odbij(dostava: Dostava) {
    this.dostavaService.odbij(dostava).subscribe((resp) => {
      this.ngOnInit();
    })
  }
}
