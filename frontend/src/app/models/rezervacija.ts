import Sto from "./sto";

export default class Rezervacija {
  id: number= 0;
  datum_vreme:  Date= new Date();
  ime: string= "";
  prezime: string= "";
  naziv: string= "";
  adresa: string= "";
  sto: number= 0;
  brOsoba: number= 0;
  opis: string= "";
  status: string= "";
  konobar: string= "";
  stolovi: Sto[] = [];
  pojavili: string= "";
  komentar: string= "";
}
