import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { RezervacijaService } from '../services/rezervacija.service';
import { Router } from '@angular/router';
import User from '../models/user';
import Rezervacija from '../models/rezervacija';
import Restoran from '../models/restoran';
import { RestoranService } from '../services/restoran.service';
import Sto from '../models/sto';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rezervacije-konobar',
  templateUrl: './rezervacije-konobar.component.html',
  styleUrls: ['./rezervacije-konobar.component.css']
})
export class RezervacijeKonobarComponent {
  constructor(private userService: UserService,private restoranService: RestoranService,private rezervacijaService: RezervacijaService,private router: Router,private http:HttpClient) { }

  ulogovan: User = new User();
  rezervacije: Rezervacija[] = []
  komentar:string="";
  restorani: Restoran[] = []
  sto: Number = 0;
  mojeRezervacije: Rezervacija[] = []
  sveRezervacije: Rezervacija[] = []

  ngOnInit(): void {
    let korisnik = localStorage.getItem('ulogovan');
    let ulogovan;
    if (korisnik != null) {ulogovan = JSON.parse(korisnik);}
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);

    this.restoranService.dohvatiSve().subscribe((restorani) => {
      this.restorani = restorani;
      restorani.forEach(restoran => {
        if (restoran.naziv == this.ulogovan.restoran) {
          this.drawShapesOnCanvas(JSON.parse(restoran.raspored));
        }
      });
    })

    this.rezervacijaService.dohvatiNeobradjeneZaRestoran(ulogovan.restoran).subscribe((rezervacije) => {
      this.rezervacije = rezervacije;
      this.rezervacije.forEach(rezervacija => {
        this.restorani.forEach(restoran => {
            if (restoran.naziv === rezervacija.naziv) {
                restoran.stolovi.forEach(sto => {
                    if (sto.brojOsoba >= rezervacija.brOsoba && sto.status === "slobodan") {
                        if (!rezervacija.stolovi) {
                            rezervacija.stolovi = [];
                        }
                        rezervacija.stolovi.push(sto);

                    }
                });
            }
        });
    });

      this.rezervacije.sort((a1, a2) => {
        return new Date(a2.datum_vreme).getTime() - new Date(a1.datum_vreme).getTime();
      });

    })

    this.rezervacijaService.dohvatiZaKonobara(this.ulogovan.korisnickoIme).subscribe((rezervacije) => {
      this.mojeRezervacije=[];
      rezervacije.forEach(r => {
        this.mojeRezervacije.push(r);

      });

    })







  }

  prihvati(r: Rezervacija) {
    this.restoranService.promeniStatusStola(r.naziv,this.sto).subscribe((resp) => {
      this.ngOnInit();
    })
    this.rezervacijaService.prihvati(r,this.sto,this.ulogovan.korisnickoIme).subscribe((resp) => {
      this.ngOnInit();
    })
  }

  odbij(r: Rezervacija) {
    this.rezervacijaService.odbij(r,this.komentar).subscribe((resp) => {
      this.ngOnInit();
    })
  }

  pojavili(r: Rezervacija) {
    let danas = new Date();
    let datum = new Date(r.datum_vreme);
    let polaSata = new Date(datum.getTime() + 30 * 60 * 1000);
    if(danas>=polaSata) {
      this.restoranService.pojavili(r.naziv,r.sto).subscribe((resp) => {
        this.ngOnInit();
      })
      this.rezervacijaService.pojavili(r).subscribe((resp) => {
        this.ngOnInit();
      })
    } else {
      alert("Nije proslo pola sata od vremena rezervacije!")
    }

  }

  nisuPojavili(r: Rezervacija) {
    let danas = new Date();
    let datum = new Date(r.datum_vreme);
    let polaSata = new Date(datum.getTime() + 30 * 60 * 1000);
    if(danas>=polaSata) {
      this.restoranService.nisuPojavili(r.naziv,r.sto).subscribe((resp) => {
        this.ngOnInit();
      })
      this.rezervacijaService.nisuPojavili(r).subscribe((resp) => {
        this.ngOnInit();
      })
    }
    else {
      alert("Nije proslo pola sata od vremena rezervacije!")
    }

  }

  drawShapesOnCanvas(shapes: any[]): void {
    const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Kontekst crtanja (2d) nije podržan na canvasu.');
      return;
    }

    shapes.forEach(shape => {
      ctx.lineWidth = parseInt(shape.border, 10);
      ctx.strokeStyle = 'black';

      if (shape.shape === 'rectangle') {
        ctx.beginPath();
        ctx.rect(shape.x, shape.y, shape.width, shape.height);
        ctx.stroke();
        const centerX = shape.x + shape.width / 2;
        const centerY = shape.y + shape.height / 2;
        const text = shape.id;
        ctx.fillStyle = 'black';
        ctx.font = '10px Arial';
        const textWidth = ctx.measureText(text).width;
        ctx.fillText(text, centerX - textWidth / 2, centerY + 5);
      } else if (shape.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.fillStyle = 'white';
        ctx.fill();
        const centerX = shape.x;
        const centerY = shape.y;
        const text = shape.id;
        ctx.fillStyle = 'black';
        ctx.font = '10px Arial';
        const textWidth = ctx.measureText(text).width;
        ctx.fillText(text, centerX - textWidth / 2, centerY + 5);

        let isStoRezervisan = false;
          this.restorani.forEach(restoran => {
            if (restoran.naziv === this.ulogovan.restoran) {
                restoran.stolovi.forEach(sto => {
                  if (sto.id == shape.id && sto.status == "rezervisan") {
                    isStoRezervisan = true;
                  }
                });
            }
        });





        if (isStoRezervisan) {
          ctx.fillStyle = 'red';
          ctx.fill();
          //this.ngOnInit()
       }
      } else {
        console.error('Nepoznat oblik u JSON datoteci:', shape);
      }
    });
  }


}
