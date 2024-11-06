import Jelo from "./jelo";

export default class User {
  korisnickoIme: string = "";
  lozinka: string= "";
  pitanje: string= "";
  odgovor: string= "";
  ime: string= "";
  prezime: string= "";
  pol: string= "";
  adresa: string= "";
  telefon: string= "";
  mejl: string= "";
  brKartice: string= "";
  slika: string= "";
  tip:string="";
  korpa: Jelo[]=[];
  restoran: string= "";
  status: string= "";
}
