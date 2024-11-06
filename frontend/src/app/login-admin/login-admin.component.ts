import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  constructor(private userService: UserService, private ruter: Router) { }

  ngOnInit(): void {
  }

  korisnickoIme: string = "";
  lozinka: string = "";
  greska: string = "";

  login() {
    this.userService.login(this.korisnickoIme, this.lozinka).subscribe(korisnik => {
      if (!korisnik) {
        this.greska = 'Loši podaci';
      }
      else {
        localStorage.setItem('ulogovan', JSON.stringify(korisnik));
        this.greska = '';
        if (korisnik.tip == 'admin') {
          this.ruter.navigate(['admin']);
        } else {
          this.greska = "Na ovoj stranici je dozvoljen login samo adminima"
        }
      }
    })
  }
}
