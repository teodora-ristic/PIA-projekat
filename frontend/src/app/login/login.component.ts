import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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
        if(korisnik.status=="prihvacen") {
          localStorage.setItem('ulogovan', JSON.stringify(korisnik));
          this.greska = '';
          if (korisnik.tip == 'gost') {
            this.ruter.navigate(['gost']);
          }
          else if (korisnik.tip == 'konobar') {
            this.ruter.navigate(['konobar']);
          } else {
            this.greska = 'Na ovoj stranici nije moguć login admina'
          }
        } else {
          if (korisnik.status=="neobradjen") {
            this.greska="Vaš zahtev za registraciju jos uvek nije obrađen"
          } else {
            this.greska="Vaš zahtev za registraciju je odbijen"
          }

        }

      }
    })
  }

}

function xorEncrypt(text: string, key: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode);
  }
  return result;
}
