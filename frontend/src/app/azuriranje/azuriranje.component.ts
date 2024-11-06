import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import User from '../models/user';

@Component({
  selector: 'app-azuriranje',
  templateUrl: './azuriranje.component.html',
  styleUrls: ['./azuriranje.component.css']
})
export class AzuriranjeComponent {
  constructor(private userService: UserService,  private router: Router) { }

  odabran:User = new User();
  korisnickoIme: string = "";
  ime: string = "";
  prezime: string = "";
  pol: string = "";
  adresa: string = "";
  mejl: string = "";
  telefon: string = "";
  brKartice: string = "";
  restoran: string = "";
  korisnici: User[] = [];
  slika:string="/assets/user.jpg";
  slikaFile: File = {} as File;

  ngOnInit(): void {
    let azuriraj = localStorage.getItem('azuriraj');
    if (azuriraj != null) this.odabran = JSON.parse(azuriraj);

    this.userService.dohvatiSve().subscribe((users: User[]) => this.korisnici = users)
  }

  azurirajSve() {
    for(let k of this.korisnici) {
      if(this.mejl == k.mejl && this.odabran.korisnickoIme!=k.korisnickoIme) {
        alert("Email nije jedinstven!");
        this.mejl=this.odabran.mejl;
        return;
      }
      if(this.korisnickoIme == k.korisnickoIme && this.odabran.mejl!=k.mejl) {
        alert("Korisnicko ime nije jedinstveno!");
        this.mejl=this.odabran.mejl;
        return;
      }
    }

    if (this.korisnickoIme=="") {
      this.korisnickoIme=this.odabran.korisnickoIme;
    }
    if (this.ime=="") {
      this.ime=this.odabran.ime;
    }
    if (this.prezime=="") {
      this.prezime=this.odabran.prezime;
    }
    if (this.pol=="") {
      this.pol=this.odabran.pol;
    }
    if (this.adresa=="") {
      this.adresa=this.odabran.adresa;
    }
    if (this.mejl=="") {
      this.mejl=this.odabran.mejl;
    }
    if (this.telefon=="") {
      this.telefon=this.odabran.telefon;
    }
    if (this.brKartice=="") {
      this.brKartice=this.odabran.brKartice;
    }
    if (this.restoran=="") {
      this.restoran=this.odabran.restoran;
    }
    this.userService.azurirajSve(this.odabran.korisnickoIme,this.korisnickoIme,this.ime,this.prezime,this.pol,
      this.adresa,this.mejl,this.telefon,this.brKartice,this.restoran).subscribe((resp) => {
      this.router.navigate(['admin']);
    })
  }

  async azurirajSliku() {
    let img= await toDataURL(this.slika)
    const data = {korisnickoIme:this.odabran.korisnickoIme,
    slika: img}
    this.userService.azurirajSliku(data).subscribe((resp) => {
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
