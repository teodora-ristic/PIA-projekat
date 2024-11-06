import { Component } from '@angular/core';
import User from '../models/user';
import Dostava from '../models/dostava';
import { UserService } from '../services/user.service';
import { DostavaService } from '../services/dostava.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dostava',
  templateUrl: './dostava.component.html',
  styleUrls: ['./dostava.component.css']
})
export class DostavaComponent {
  constructor(private userService: UserService,private dostavaService: DostavaService,private router: Router) { }

  ulogovan: User = new User();
  aktuelne: Dostava[] = []
  istekle: Dostava[] = []


  ngOnInit(): void {
    let danas = new Date();
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);
    this.dostavaService.dohvatiZaKorisnika(this.ulogovan.korisnickoIme).subscribe((dostave) => {
      dostave.forEach(d => {

        let datum = new Date(d.datum);
        let dostavljeno = new Date(datum.getTime()+d.vreme_do*60*1000)

        if(d.status=="neobradjena" || (d.status=="prihvacena" && dostavljeno>danas)) {
          this.aktuelne.push(d);
        } else {
          this.istekle.push(d);
        }
      });
      this.istekle.sort((a1, a2) => {
        return new Date(a2.datum).getTime() - new Date(a1.datum).getTime();
      });
    })


  }
}
