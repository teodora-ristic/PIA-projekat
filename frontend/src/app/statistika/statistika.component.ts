import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RezervacijaService } from '../services/rezervacija.service';
import Rezervacija from '../models/rezervacija';
import User from '../models/user';
import Restoran from '../models/restoran';
import { RestoranService } from '../services/restoran.service';

@Component({
  selector: 'app-statistika',
  templateUrl: './statistika.component.html',
  styleUrls: ['./statistika.component.css']
})
export class StatistikaComponent implements OnInit{

  constructor(private rezervacijaService:RezervacijaService,private restoranService:RestoranService){}

  rezervacije: Rezervacija[]=[]
  ulogovan: User = new User()
  dani: string[] = [ 'ned','pon', 'uto', 'sre', 'cet', 'pet', 'sub'];
  brojGostiju: number[] = [0,0,0,0,0,0,0]
  restoran: Restoran = new Restoran()
  konobari:string[] = []
  brojGostijuKonobar: number[] = []
  brojRezervacija: number[] = [0,0,0,0,0,0,0]
  brojacDana: number[] = [0,0,0,0,0,0,0]
  prosekPoDanima: number[] = [0,0,0,0,0,0,0]

  ngOnInit(): void {
    let korisnik = localStorage.getItem('ulogovan');
    let ulogovan;
    if (korisnik != null) {ulogovan = JSON.parse(korisnik);}
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);

    let brojGostiju = this.brojGostiju

    this.rezervacijaService.dohvatiZaKonobara(ulogovan.korisnickoIme).subscribe((rez) => {
      rez.forEach(r => {
        let date = new Date(r.datum_vreme)
        const danUNedelji = date.getDay();
        brojGostiju[danUNedelji]+=r.brOsoba;

      });
      this.brojGostiju=brojGostiju

      this.nacrtajDijagram();
    })

    let konobari = this.konobari
    let brojGostijuKonobar = this.brojGostijuKonobar

    this.restoranService.dohvatiPoNazivu(ulogovan.restoran).subscribe((res) => {
      res.konobari.forEach(k => {
        this.rezervacijaService.dohvatiZaKonobara(k.korisnickoIme).subscribe((rez) => {
          let br = 0;
          rez.forEach(r => {
            br += r.brOsoba;
          });
          konobari.push(k.korisnickoIme);
          brojGostijuKonobar.push(br);

          if (konobari.length === res.konobari.length) {
            console.log('Konobari:', konobari);
            console.log('Broj gostiju po konobaru:', brojGostijuKonobar);
            this.konobari=konobari
            this.brojGostijuKonobar=brojGostijuKonobar
            this.nacrtajDijagram2();
          }
        });
      });
    });

    let brojRezervacija = this.brojRezervacija
    let brojacDana = this.brojacDana
    let prosekPoDanima = this.prosekPoDanima

    this.rezervacijaService.dohvatiSve().subscribe((rez) => {
      rez.forEach(r => {
        let date = new Date(r.datum_vreme)
        let pre2godine = new Date();
        pre2godine.setFullYear(pre2godine.getFullYear() - 2);
        if(date>=pre2godine){
          let date = new Date(r.datum_vreme)
          const danUNedelji = date.getDay();
          brojRezervacija[danUNedelji]++;

        }

      });
      this.brojRezervacija=brojRezervacija

      let danas = new Date();
      let pre2godine = new Date();
      pre2godine.setFullYear(pre2godine.getFullYear() - 2);
      for (let datum = new Date(pre2godine); datum <= danas; datum.setDate(datum.getDate() + 1)) {
        const danUNedelji = datum.getDay();
        brojacDana[danUNedelji]++;
      }
      this.brojacDana=brojacDana

      for (let i = 0; i < 7; i++) {
        prosekPoDanima[i] = brojRezervacija[i]/brojacDana[i]
      }

      this.prosekPoDanima=prosekPoDanima
      this.nacrtajDijagram3();
    })


  }


  nacrtajDijagram(): void {
    const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Kontekst crtanja (2d) nije podržan na canvasu.');
      return;
    }

    const height = canvas.height;
    const barWidth = 20;
    const base = height - 30;

    const maxGosti = Math.max(...this.brojGostiju);
    const scale = base / maxGosti - 5;

    ctx.fillStyle = 'blue';
    for (let i = 0; i < this.brojGostiju.length; i++) {
      const barHeight = this.brojGostiju[i]*scale;
      const x = 10 + i * (barWidth + 20);
      ctx.fillRect(x, base - barHeight, barWidth, barHeight);


      ctx.fillStyle = 'black';
      ctx.fillText(this.dani[i], x + barWidth / 2 - 10, base + 20);

      ctx.fillText(this.brojGostiju[i].toString(), x + barWidth / 2 - 10, base - barHeight - 10);
    }



  }

  nacrtajDijagram2(): void {
    const canvas = document.getElementById('myCanvas2') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Kontekst crtanja (2d) nije podržan na canvasu.');
      return;
    }

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;


    const totalGostiju = this.brojGostijuKonobar.reduce((acc, curr) => acc + curr, 0);

    let startAngle = -Math.PI / 2;
    let endAngle = 0;
    for (let i = 0; i < this.konobari.length; i++) {
      endAngle = startAngle + (Math.PI * 2 * this.brojGostijuKonobar[i]) / totalGostiju;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();


      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      while (randomColor == '#000000') {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      }

      ctx.fillStyle = randomColor;
      ctx.fill();

      if (this.brojGostijuKonobar[i]>0) {
        const angle = startAngle + (endAngle - startAngle) / 2;
        const labelRadius = radius / 2;
        const labelX = centerX + Math.cos(angle) * labelRadius;
        const labelY = centerY + Math.sin(angle) * labelRadius;
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(this.konobari[i], labelX, labelY);
      }


      startAngle = endAngle;
    }

  }

  nacrtajDijagram3(): void {
    const canvas = document.getElementById('myCanvas3') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Kontekst crtanja (2d) nije podržan na canvasu.');
      return;
    }

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const barWidth = canvasWidth / 7;
    const maxProsek = Math.max(...this.prosekPoDanima);

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    this.prosekPoDanima.forEach((prosek, index) => {
      const barHeight = (prosek / maxProsek) * canvasHeight * 0.8; // Visina stubića

      ctx.fillStyle = 'rgba(54, 162, 235, 0.5)';
      ctx.fillRect(index * barWidth, canvasHeight - barHeight, barWidth, barHeight);

      ctx.strokeStyle = 'rgba(54, 162, 235, 1)';
      ctx.strokeRect(index * barWidth, canvasHeight - barHeight, barWidth, barHeight);
    });

    ctx.fillStyle = '#000';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('NED', barWidth / 2, canvasHeight - 10);
    ctx.fillText('PON', barWidth / 2 + barWidth, canvasHeight - 10);
    ctx.fillText('UTO', barWidth / 2 + 2 * barWidth, canvasHeight - 10);
    ctx.fillText('SRE', barWidth / 2 + 3 * barWidth, canvasHeight - 10);
    ctx.fillText('CET', barWidth / 2 + 4 * barWidth, canvasHeight - 10);
    ctx.fillText('PET', barWidth / 2 + 5 * barWidth, canvasHeight - 10);
    ctx.fillText('SUB', barWidth / 2 + 6 * barWidth, canvasHeight - 10);
  }

}
