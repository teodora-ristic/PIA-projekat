import { Component } from '@angular/core';
import User from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { RestoranService } from '../services/restoran.service';

@Component({
  selector: 'app-dodaj-konobara',
  templateUrl: './dodaj-konobara.component.html',
  styleUrls: ['./dodaj-konobara.component.css']
})
export class DodajKonobaraComponent {
  korisnickoIme: string = "";
  lozinka: string = "";
  pitanje: string = "";
  odgovor: string = "";
  ime: string = "";
  prezime: string = "";
  pol: string = "";
  adresa: string = "";
  telefon: string = "";
  mejl: string = "";
  brKartice: string = "";
  slika:string="/assets/user.jpg";
  slikaFile: File = {} as File;
  restoran: string = "";

  korisnici: User[] = [];

  constructor(private restoranService: RestoranService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.dohvatiSve().subscribe((users: User[]) => this.korisnici = users)
  }

  async dodaj() {

    if (this.korisnickoIme == '' ||
      this.lozinka == "" ||
      this.pitanje == "" ||
      this.odgovor == "" ||
      this.ime == "" ||
      this.prezime == "" ||
      this.pol == "" ||
      this.adresa == "" ||
      this.telefon == "" ||
      this.mejl == "" ||
      this.brKartice == "" ||
      this.restoran == "") {
      alert('Molimo vas da popunite sva obavezna polja.');
      return;
    }
    for(let k of this.korisnici) {
      if(this.korisnickoIme == k.korisnickoIme) {
        alert("Korisnicko ime nije jedinstveno!");
        return;
      }
      if(this.mejl == k.mejl) {
        alert("Email nije jedinstven!");
        return;
      }
    }

    let img= await toDataURL(this.slika)
    const data = {
      korisnickoIme: this.korisnickoIme, lozinka: this.lozinka,
      pitanje: this.pitanje, odgovor: this.odgovor,
      ime: this.ime, prezime: this.prezime,
      pol: this.pol, adresa: this.adresa,
      telefon: this.telefon, mejl: this.mejl,
      brKartice: this.brKartice, restoran: this.restoran,
      slika: img

    }

    let regex = new RegExp(/^(?=(.*[a-z]){3})(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z][A-Za-z\d!@#$%^&*]{5,9}$/);
    if (regex.test(this.lozinka)==true) {
      this.restoranService.dodajKonobara(data).subscribe((response)=>{

      })
      this.userService.dodajKonobara(data).subscribe((response) => {
        this.router.navigate(['admin']);

      });
    } else {
      alert("Lozinka nije u dobrom formatu")
      return
    }
  }

  onFileSelected(event: any){
    var reader = new FileReader();
    const selectedFile = event.target.files[0];

    const img = new Image();
    img.src = window.URL.createObjectURL(selectedFile);

    img.onload = () => {
      if((img.width >=300 || img.height >=300)||(img.width <100 || img.height <100))
      {
        alert('Slika nije dobrih dimenzija');
        this.slika="/assets/user.jpg";
        return
      }
    }

      reader.onload = (event: any) => {
        this.slika = event.target.result;
        this.slikaFile = selectedFile;
      };

      reader.onerror = (event: any) => {
        console.log("Fajl ne moze da se procita" + event.target.error.code);
      };
      reader.readAsDataURL(event.target.files[0]);

  }
}

  async function toDataURL(url: any){

    var res = await fetch(url);
    var blob = await res.blob();

    const result = await new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject();
      };
      reader.readAsDataURL(blob);
    })

    return result
}
