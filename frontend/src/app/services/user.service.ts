import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../models/user';
import Jelo from '../models/jelo';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/user";

  login(username: string, password: string) {
    let data = {
      username: username, password: password
    }
    return this.http.post<User>(`${this.uri}/login`, data)
  }

  getUser(username: string) {
    let data = {
      username: username
    }
    return this.http.post<User>(`${this.uri}/getUser`, data)
  }

  dohvatiSve() {
    return this.http.get<User[]>(`${this.uri}/dohvatiSve`)
  }

  registracija(data: any) {
    return this.http.post(`${this.uri}/registracija`, data)
  }

  promeniLozinku(korisnickoIme: string, stara: string, nova: string) {
    let data = {
      korisnickoIme: korisnickoIme, stara: stara, nova: nova
    }
    return this.http.post<User>(`${this.uri}/promeniLozinku`, data)
  }

  broj() {
    return this.http.get<Number>(`${this.uri}/broj`)
  }

  azuriraj(korisnickoIme: string, ime: string, prezime: string, adresa: string, mejl: string, telefon: string, brKartice: string) {
    const data = {
      korisnickoIme:korisnickoIme,
      ime:ime,
      prezime:prezime,
      adresa:adresa,
      mejl:mejl,
      telefon:telefon,
      brKartice:brKartice
    }
    return this.http.post(`${this.uri}/azuriraj`, data)
  }

  azuriraj2(korisnickoIme: string, ime: string, prezime: string, adresa: string, mejl: string, telefon: string) {
    const data = {
      korisnickoIme:korisnickoIme,
      ime:ime,
      prezime:prezime,
      adresa:adresa,
      mejl:mejl,
      telefon:telefon
    }
    return this.http.post(`${this.uri}/azuriraj2`, data)
  }

  azurirajSliku(data: any) {
    return this.http.post(`${this.uri}/azurirajSliku`, data)
  }

  dodajUKorpu(jelo: Jelo, korisnickoIme: string ) {
    const data = {
      jelo:jelo,
      korisnickoIme:korisnickoIme
    }
    return this.http.post(`${this.uri}/dodajUKorpu`, data)
  }

  isprazniKorpu(korisnickoIme: string ) {
    const data = {
      korisnickoIme:korisnickoIme
    }
    return this.http.post(`${this.uri}/isprazniKorpu`, data)
  }

  dohvatiGoste() {
    return this.http.get<User[]>(`${this.uri}/dohvatiGoste`)
  }

  dohvatiKonobare() {
    return this.http.get<User[]>(`${this.uri}/dohvatiKonobare`)
  }

  prihvati(korisnickoIme: string ) {
    const data = {
      korisnickoIme:korisnickoIme
    }
    return this.http.post(`${this.uri}/prihvati`, data)
  }

  odbij(korisnickoIme: string ) {
    const data = {
      korisnickoIme:korisnickoIme
    }
    return this.http.post(`${this.uri}/odbij`, data)
  }

  dodajKonobara(data: any) {
    return this.http.post(`${this.uri}/dodajKonobara`, data)
  }

  dohvatiKonobareR(restoran:string) {
    const data = {
      restoran:restoran
    }
    return this.http.post<User[]>(`${this.uri}/dohvatiKonobareR`,data)
  }

  azurirajSve(korisnickoIme: string,korisnickoImeN: string, ime: string, prezime: string, pol: string,
    adresa: string, mejl: string, telefon: string, brKartice: string, restoran: string) {
    const data = {
      korisnickoIme:korisnickoIme,
      korisnickoImeN:korisnickoImeN,
      ime:ime,
      prezime:prezime,
      pol:pol,
      adresa:adresa,
      mejl:mejl,
      telefon:telefon,
      brKartice:brKartice,
      restoran:restoran
    }
    return this.http.post(`${this.uri}/azurirajSve`, data)
  }

  dohvatiNeobradjene() {
    return this.http.get<User[]>(`${this.uri}/dohvatiNeobradjene`)
  }
}
