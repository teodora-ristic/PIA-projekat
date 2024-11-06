import * as express from 'express';
import Dostava from '../models/dostava'

export class DostavaController { 
    dohvatiZaKorisnika = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        Dostava.find({korisnickoIme: korisnickoIme})
        .then((dostave) => {
            res.json(dostave);
        })
        .catch((err) => console.log(err));
    }

    dohvatiZaRestoran = (req: express.Request, res: express.Response) => {
        let restoran = req.body.restoran
        Dostava.find({naziv:restoran})
        .then((dostave) => {
            res.json(dostave);
        })
        .catch((err) => console.log(err));
    }

    potvrdi = (req: express.Request, res: express.Response) => {
        let vreme_od = parseInt(req.body.vreme_od);
        let vreme_do = parseInt(req.body.vreme_od)+10;
        let dostava = req.body.dostava;
        Dostava.findOneAndUpdate({id: dostava.id}, {vreme_od: vreme_od, vreme_do:vreme_do,status:"prihvacena"}).then(ok=>{
            res.json({ 'msg': 'ok' })
          }).catch((err) => console.log(err));
    }

    odbij = (req: express.Request, res: express.Response) => {
        let dostava = req.body.dostava;
        Dostava.findOneAndUpdate({id: dostava.id}, {status:"odbijena"}).then(ok=>{
            res.json({ 'msg': 'ok' })
          }).catch((err) => console.log(err));
    }

    dodaj = (req: express.Request, res: express.Response) => {
        let dostava = new Dostava ({
            id: 0,
            korisnickoIme: req.body.korisnickoIme,
            naziv: req.body.naziv,
            status: "neobradjena",
            vreme_od: 0,
            vreme_do: 0,
            datum: new Date(),
            racun: req.body.racun
        })

        let x = 1;

        Dostava.find().sort({ id: -1 }).limit(1).then((max) => {
        if (max.length > 0) {
          x = max[0].id + 1;
        }

        dostava.id = x;

        dostava.save().then((d) => {
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
    
}