import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Restoran from '../models/restoran';

@Injectable({
  providedIn: 'root'
})
export class RestoranService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/restoran";

  broj() {
    return this.http.get<Number>(`${this.uri}/broj`)
  }

  dohvatiSve() {
    return this.http.get<Restoran[]>(`${this.uri}/dohvatiSve`)
  }

  sortirajPoNazivuAsc() {
    return this.http.get<Restoran[]>(`${this.uri}/sortirajPoNazivuAsc`)
  }

  sortirajPoNazivuDesc() {
    return this.http.get<Restoran[]>(`${this.uri}/sortirajPoNazivuDesc`)
  }

  sortirajPoAdresiAsc() {
    return this.http.get<Restoran[]>(`${this.uri}/sortirajPoAdresiAsc`)
  }

  sortirajPoAdresiDesc() {
    return this.http.get<Restoran[]>(`${this.uri}/sortirajPoAdresiDesc`)
  }

  sortirajPoTipuAsc() {
    return this.http.get<Restoran[]>(`${this.uri}/sortirajPoTipuAsc`)
  }

  sortirajPoTipuDesc() {
    return this.http.get<Restoran[]>(`${this.uri}/sortirajPoTipuDesc`)
  }

  pretraga(naziv: string, adresa: string, tip: string) {
    const data = {
      naziv:naziv,
      adresa:adresa,
      tip:tip
    }
    return this.http.post<Restoran[]>(`${this.uri}/pretraga`,data)
  }

  promeniStatusStola(naziv: string, sto: Number) {
    const data = {naziv:naziv, sto:sto}
    return this.http.post(`${this.uri}/promeniStatusStola`,data)
  }

  dohvatiPoNazivu(naziv: string) {
    const data = {naziv:naziv}
    return this.http.post<Restoran>(`${this.uri}/dohvatiPoNazivu`,data)
  }

  pojavili(naziv: string, sto: number) {
    const data = {naziv:naziv, sto:sto}
    return this.http.post(`${this.uri}/pojavili`,data)
  }

  nisuPojavili(naziv: string, sto: number) {
    const data = {naziv:naziv, sto:sto}
    return this.http.post(`${this.uri}/nisuPojavili`,data)
  }

  dodajRestoran(data: any) {
    return this.http.post(`${this.uri}/dodajRestoran`, data)
  }

  dodajKonobara(data: any) {
    return this.http.post(`${this.uri}/dodajKonobara`, data)
  }
}
