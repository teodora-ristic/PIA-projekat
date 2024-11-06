import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Dostava from '../models/dostava';

@Injectable({
  providedIn: 'root'
})
export class DostavaService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/dostava";

  dohvatiZaKorisnika(korisnickoIme:string) {
    const data = {
      korisnickoIme:korisnickoIme
    }
    return this.http.post<Dostava[]>(`${this.uri}/dohvatiZaKorisnika`,data)
  }

  dohvatiZaRestoran(restoran:string) {
    const data = {
      restoran:restoran
    }
    return this.http.post<Dostava[]>(`${this.uri}/dohvatiZaRestoran`,data)
  }

  potvrdi(vreme_od:number,dostava:Dostava) {
    const data = {
      vreme_od:vreme_od,
      dostava:dostava
    }
    return this.http.post(`${this.uri}/potvrdi`,data)
  }

  odbij(dostava:Dostava) {
    const data = {
      dostava:dostava
    }
    return this.http.post(`${this.uri}/odbij`,data)
  }

  dodaj(korisnickoIme: string,naziv: string,racun:number) {
    const data = {
      korisnickoIme:korisnickoIme,
      naziv:naziv,
      racun:racun
    }
    return this.http.post(`${this.uri}/dodaj`,data)
  }


}
