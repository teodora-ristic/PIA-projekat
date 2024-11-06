import * as express from 'express';
import Rezervacija from '../models/rezervacija'


export class RezervacijaController { 
    dohvatiSve = (req: express.Request, res: express.Response) => {
        Rezervacija.find()
        .then((rezervacije) => {
            res.json(rezervacije);
        })
        .catch((err) => console.log(err));
    }

    dodajRezervaciju = (req: express.Request, res: express.Response) => {
        let novaRez = new Rezervacija ({
            id:0,
            datum_vreme:req.body.datum_vreme,
            ime:req.body.ime,
            prezime:req.body.prezime,
            korisnickoIme:req.body.korisnickoIme,
            naziv:req.body.naziv,
            adresa:req.body.adresa,
            sto:0,
            brOsoba:req.body.broj,
            zahtevi:req.body.zahtevi,
            status:"neobradjena",
            konobar:"",
            pojavili:"",
            komentar:""
        })
        let x = 1;

        Rezervacija.find().sort({ id: -1 }).limit(1).then((max) => {
        if (max.length > 0) {
          // provera za slucaj da je kolekcija inicijalno prazna
          // tada ce prvi objekat imati id = x = 1
          // ako kolekcija nije prazna, dodelicemo prvi sledeci id
          x = max[0].id + 1;
        }

        novaRez.id = x;

        novaRez.save().then((r) => {
          res.status(200).json({ message: "ok" });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({ message: "error" });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "error" });
      });
        
        
    }

    dohvatiZaKorisnika = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        Rezervacija.find({korisnickoIme: korisnickoIme})
        .then((rezervacije) => {
            res.json(rezervacije);
        })
        .catch((err) => console.log(err));
    }

    dohvatiNeobradjeneZaRestoran = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv
        Rezervacija.find({status: "neobradjena", naziv:naziv}).then((rezervacije) => {
            res.json(rezervacije);
        })
        .catch((err) => console.log(err));
    }

    dohvatiZaRestoran = (req: express.Request, res: express.Response) => {
      let naziv = req.body.naziv
      Rezervacija.find({naziv:naziv}).then((rezervacije) => {
          res.json(rezervacije);
      })
      .catch((err) => console.log(err));
  }

    prihvati = (req: express.Request, res: express.Response) => {
      let rezervacija = req.body.rezervacija
      let sto = parseInt(req.body.sto)
      let korisnickoIme = req.body.korisnickoIme
      
      Rezervacija.findOneAndUpdate({id: rezervacija.id}, {status: "prihvacena", sto: sto, konobar:korisnickoIme}).then(ok=>{
        res.json({ 'msg': 'ok' })
      }).catch((err) => console.log(err));
    }

    odbij = (req: express.Request, res: express.Response) => {
      let rezervacija = req.body.rezervacija
      let komentar = req.body.komentar
      Rezervacija.findOneAndUpdate({id: rezervacija.id}, {status: "odbijena", komentar:komentar}).then(ok=>{
        res.json({ 'msg': 'ok' })
      }).catch((err) => console.log(err));
    }

    dohvatiZaKonobara = (req: express.Request, res: express.Response) => {
      let korisnickoIme = req.body.korisnickoIme
      
      Rezervacija.find({konobar: korisnickoIme}).then((rezervacije) => {
          res.json(rezervacije);
      }).catch((err) => console.log(err));
    }

    pojavili = (req: express.Request, res: express.Response) => {
      let rezervacija = req.body.rezervacija
      Rezervacija.findOneAndUpdate({id: rezervacija.id}, {pojavili: "da"}).then(ok=>{
        res.json({ 'msg': 'ok' })
      }).catch((err) => console.log(err));
    }

    nisuPojavili = (req: express.Request, res: express.Response) => {
      let rezervacija = req.body.rezervacija
      Rezervacija.findOneAndUpdate({id: rezervacija.id}, {pojavili: "ne"}).then(ok=>{
        res.json({ 'msg': 'ok' })
      }).catch((err) => console.log(err));
    }

}