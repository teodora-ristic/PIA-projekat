import { Component } from '@angular/core';
import User from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { RestoranService } from '../services/restoran.service';
import Radno from '../models/radno';
import { HttpClient } from '@angular/common/http';
import Sto from '../models/sto';

@Component({
  selector: 'app-dodaj-restoran',
  templateUrl: './dodaj-restoran.component.html',
  styleUrls: ['./dodaj-restoran.component.css']
})
export class DodajRestoranComponent {

  constructor(private userService: UserService,private restoranService: RestoranService, private router: Router, private http:HttpClient) { }

  naziv: string = "";
  tip: string = "";
  adresa: string = "";
  opis: string = "";
  kontakt: string = "";
  radnoVreme:Radno[] = [];
  ponOd: number = 0;
  ponDo: number = 0;
  utoOd: number = 0;
  utoDo: number = 0;
  sreOd: number = 0;
  sreDo: number = 0;
  cetOd: number = 0;
  cetDo: number = 0;
  petOd: number = 0;
  petDo: number = 0;
  subOd: number = 0;
  subDo: number = 0;
  nedOd: number = 0;
  nedDo: number = 0;
  stolovi: Sto[] = [];
  raspored:string="";

  ngOnInit(): void {

  }


  handleFile() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      const reader = new FileReader();

      reader.onload = (event) => {
        const contents = event.target?.result as string;
        try {
          this.raspored=contents;
          const data = JSON.parse(contents);
          this.drawShapesOnCanvas(data);
        } catch (error) {
          alert('Greška prilikom parsiranja JSON-a:');
        }
      };

      reader.readAsText(file);
    } else {
      console.error('Nije odabran fajl.');
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
        const id = shape.id;
        const num = shape.num
        const sto = new Sto();
        sto.id=id;
        sto.brojOsoba=num;
        sto.status="slobodan";
        this.stolovi.push(sto);

        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
        ctx.stroke();
        const centerX = shape.x;
        const centerY = shape.y;
        const text = shape.num;
        ctx.fillStyle = 'black';
        ctx.font = '10px Arial';
        const textWidth = ctx.measureText(text).width;
        ctx.fillText(text, centerX - textWidth / 2, centerY + 5);
      } else {
        console.error('Nepoznat oblik u JSON datoteci:', shape);
      }


    });
  }


/*
drawShapesOnCanvas(shapes: any[]): void {
  let prekl = false;
  const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    console.error('Kontekst crtanja (2d) nije podržan na canvasu.');
    return;
  }

  // Niz koji će sadržati oblike koji su već nacrtani na platnu
  const drawnShapes: any[] = [];

  shapes.forEach(shape => {
    ctx.lineWidth = parseInt(shape.border, 10);
    ctx.strokeStyle = 'black';

    if (shape.shape === 'rectangle') {
      const overlaps = drawnShapes.some(drawnShape => {
        if (drawnShape.shape !== 'rectangle') return false; // Samo pravougaonici mogu da se preklapaju sa pravougaonicima

        const currentLeft = shape.x;
        const currentRight = shape.x + shape.width;
        const currentTop = shape.y;
        const currentBottom = shape.y + shape.height;

        const drawnLeft = drawnShape.x;
        const drawnRight = drawnShape.x + drawnShape.width;
        const drawnTop = drawnShape.y;
        const drawnBottom = drawnShape.y + drawnShape.height;

        return (
          currentLeft < drawnRight &&
          currentRight > drawnLeft &&
          currentTop < drawnBottom &&
          currentBottom > drawnTop
        );
      });

      if (overlaps) {
        alert('Oblik se preklapa');
        return;
        prekl=true;

      }

      drawnShapes.push({
        shape: 'rectangle',
        x: shape.x,
        y: shape.y,
        width: shape.width,
        height: shape.height
      });

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
      const id = shape.id;
        const num = shape.num
        const sto = new Sto();
        sto.id=id;
        sto.brojOsoba=num;
        sto.status="slobodan";
        this.stolovi.push(sto);
      const overlaps = drawnShapes.some(drawnShape => {
        if (drawnShape.shape !== 'circle') return false;

        const currentCenterX = shape.x;
        const currentCenterY = shape.y;
        const currentRadius = shape.radius;

        const drawnCenterX = drawnShape.x;
        const drawnCenterY = drawnShape.y;
        const drawnRadius = drawnShape.radius;

        const distance = Math.sqrt(
          Math.pow(currentCenterX - drawnCenterX, 2) +
          Math.pow(currentCenterY - drawnCenterY, 2)
        );

        return distance < currentRadius + drawnRadius;
      });

      if (overlaps) {
        alert('Oblik se preklapa');
        return;
        prekl=true;
      }

      drawnShapes.push({
        shape: 'circle',
        x: shape.x,
        y: shape.y,
        radius: shape.radius
      });

      ctx.beginPath();
      ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
      ctx.stroke();
      const centerX = shape.x;
      const centerY = shape.y;
      const text = shape.num;
      ctx.fillStyle = 'black';
      ctx.font = '10px Arial';
      const textWidth = ctx.measureText(text).width;
      ctx.fillText(text, centerX - textWidth / 2, centerY + 5);
    } else {
        console.error('Nepoznat oblik u JSON datoteci:', shape);
    }

    })
    if (prekl==true) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.stolovi = []
    }
  }
*/
  dodaj(){
    if (this.naziv == '' ||
      this.tip == "" ||
      this.adresa == "" ||
      this.opis == "" ||
      this.kontakt == "" ||
      this.ponOd == 0 || this.ponDo == 0 ||
      this.utoOd == 0 || this.utoDo == 0 ||
      this.sreOd == 0 || this.sreDo == 0 ||
      this.cetOd == 0 || this.cetDo == 0 ||
      this.petOd == 0 || this.petDo == 0 ||
      this.subOd == 0 || this.subDo == 0 ||
      this.nedOd == 0 || this.nedDo == 0) {
      alert('Molimo vas da popunite sva obavezna polja.');
      return;
    }
    let pon = new Radno();
    pon.dan=1;
    pon.vreme_od=this.ponOd;
    pon.vreme_do=this.ponDo;
    this.radnoVreme.push(pon)

    let uto = new Radno();
    uto.dan=2;
    uto.vreme_od=this.utoOd;
    uto.vreme_do=this.utoDo;
    this.radnoVreme.push(uto)

    let sre = new Radno();
    sre.dan=3;
    sre.vreme_od=this.sreOd;
    sre.vreme_do=this.sreDo;
    this.radnoVreme.push(sre)

    let cet = new Radno();
    cet.dan=4;
    cet.vreme_od=this.cetOd;
    cet.vreme_do=this.cetDo;
    this.radnoVreme.push(cet)

    let pet = new Radno();
    pet.dan=5;
    pet.vreme_od=this.petOd;
    pet.vreme_do=this.petDo;
    this.radnoVreme.push(pet)

    let sub = new Radno();
    sub.dan=6;
    sub.vreme_od=this.subOd;
    sub.vreme_do=this.subDo;
    this.radnoVreme.push(sub)

    let ned = new Radno();
    ned.dan=0;
    ned.vreme_od=this.nedOd;
    ned.vreme_do=this.nedDo;
    this.radnoVreme.push(ned)


    this.userService.dohvatiKonobareR(this.naziv).subscribe((konobari) => {
      const data = {
        naziv: this.naziv, adresa: this.adresa,
        tip: this.tip, telefon: this.kontakt,
        radno_vreme: this.radnoVreme, konobari: konobari,stolovi:this.stolovi,raspored:this.raspored
      }

      this.restoranService.dodajRestoran(data).subscribe((response) => {
        this.router.navigate(['admin']);

      });
    })
  }


}





