import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Rezervacija from '../models/rezervacija';

@Injectable({
  providedIn: 'root'
})
export class RezervacijaService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/rezervacija";

  dohvatiSve() {
    return this.http.get<Rezervacija[]>(`${this.uri}/dohvatiSve`)
  }

  dodajRezervaciju(datum_vreme: Date, ime: string, prezime: string,korisnickoIme: string, naziv: string, adresa: string, broj: number, zahtevi: string) {
    const data = {
      datum_vreme:datum_vreme,
      ime:ime,
      prezime:prezime,
      korisnickoIme:korisnickoIme,
      naziv:naziv,
      adresa:adresa,
      broj:broj,
      zahtevi:zahtevi
    }
    return this.http.post(`${this.uri}/dodajRezervaciju`,data)
  }

  dohvatiZaKorisnika(korisnickoIme:string) {
    const data = {
      korisnickoIme:korisnickoIme
    }
    return this.http.post<Rezervacija[]>(`${this.uri}/dohvatiZaKorisnika`,data)
  }

  dohvatiNeobradjeneZaRestoran(naziv:string) {
    const data = {
      naziv:naziv
    }
    return this.http.post<Rezervacija[]>(`${this.uri}/dohvatiNeobradjeneZaRestoran`,data)
  }

  dohvatiZaRestoran(naziv:string) {
    const data = {
      naziv:naziv
    }
    return this.http.post<Rezervacija[]>(`${this.uri}/dohvatiZaRestoran`,data)
  }

  prihvati(rezervacija: Rezervacija,sto:Number,korisnickoIme:string) {
    const data = {rezervacija:rezervacija,sto:sto,korisnickoIme:korisnickoIme}
    return this.http.post(`${this.uri}/prihvati`,data)
  }

  odbij(rezervacija: Rezervacija, komentar: string) {
    const data = {rezervacija:rezervacija, komentar:komentar}
    return this.http.post(`${this.uri}/odbij`,data)
  }

  dohvatiZaKonobara(korisnickoIme:string) {
    const data = {korisnickoIme:korisnickoIme}
    return this.http.post<Rezervacija[]>(`${this.uri}/dohvatiZaKonobara`,data)
  }

  pojavili(rezervacija: Rezervacija) {
    const data = {rezervacija:rezervacija}
    return this.http.post(`${this.uri}/pojavili`,data)
  }

  nisuPojavili(rezervacija: Rezervacija) {
    const data = {rezervacija:rezervacija}
    return this.http.post(`${this.uri}/nisuPojavili`,data)
  }
}
