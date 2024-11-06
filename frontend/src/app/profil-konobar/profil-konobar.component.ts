import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import User from '../models/user';

@Component({
  selector: 'app-profil-konobar',
  templateUrl: './profil-konobar.component.html',
  styleUrls: ['./profil-konobar.component.css']
})
export class ProfilKonobarComponent implements OnInit{
  constructor(private userService:UserService) {}

  ime: string = "";
  prezime: string = "";
  adresa: string = "";
  mejl: string = "";
  telefon: string = "";
  ulogovan: User = new User()
  korisnici: User[] = [];
  slika:string="/assets/user.jpg";
  slikaFile: File = {} as File;

  ngOnInit(): void {
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);
    this.userService.getUser(this.ulogovan.korisnickoIme).subscribe(u => {
      this.ulogovan = u
    })
    this.userService.dohvatiSve().subscribe((users: User[]) => this.korisnici = users)
  }

  azuriraj() {
    for(let k of this.korisnici) {
      if(this.mejl == k.mejl && this.ulogovan.korisnickoIme!=k.korisnickoIme) {
        alert("Email nije jedinstven!");
        this.mejl=this.ulogovan.mejl;
        return;
      }
    }
    if (this.ime=="") {
      this.ime=this.ulogovan.ime;
    }
    if (this.prezime=="") {
      this.prezime=this.ulogovan.prezime;
    }
    if (this.adresa=="") {
      this.adresa=this.ulogovan.adresa;
    }
    if (this.mejl=="") {
      this.mejl=this.ulogovan.mejl;
    }
    if (this.telefon=="") {
      this.telefon=this.ulogovan.telefon;
    }
    this.userService.azuriraj2(this.ulogovan.korisnickoIme,this.ime,this.prezime,this.adresa,this.mejl,this.telefon).subscribe((resp) => {
      this.ime = "";
      this.prezime = "";
      this.adresa = "";
      this.mejl = "";
      this.telefon = "";
      this.ngOnInit();
    })
  }

  async azurirajSliku() {
    let img= await toDataURL(this.slika)
    const data = {korisnickoIme:this.ulogovan.korisnickoIme,
    slika: img}
    this.userService.azurirajSliku(data).subscribe((resp) => {
      this.slika="/assets/user.jpg";
      this.ngOnInit();
    })
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
