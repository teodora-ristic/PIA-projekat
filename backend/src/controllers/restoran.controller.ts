import * as express from 'express';
import Restoran from '../models/restoran'
import User from '../models/user';


export class RestoranController { 
    broj = (req: express.Request, res: express.Response) => {
        Restoran.countDocuments().then(cnt=>{
            res.json(cnt)
        }).catch(err=>{
            console.log(err)
        })
    }
    dohvatiSve = (req: express.Request, res: express.Response) => {
        Restoran.find()
        .then((restorani) => {
            res.json(restorani);
        })
        .catch((err) => console.log(err));
    }

    dohvatiPoNazivu = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        Restoran.findOne({naziv:naziv})
        .then((restoran) => {
            res.json(restoran);
        })
        .catch((err) => console.log(err));
    }

    sortirajPoNazivuAsc = (req: express.Request, res: express.Response) => {
        Restoran.find().sort({ naziv: 1 }) 
        .then((restorani) => {
            res.json(restorani);
        })
        .catch((err) => console.log(err));
    }
    sortirajPoNazivuDesc = (req: express.Request, res: express.Response) => {
        Restoran.find().sort({ naziv: -1 }) 
        .then((restorani) => {
            res.json(restorani);
        })
        .catch((err) => console.log(err));
    }
    sortirajPoAdresiAsc = (req: express.Request, res: express.Response) => {
        Restoran.find().sort({ adresa: 1 }) 
        .then((restorani) => {
            res.json(restorani);
        })
        .catch((err) => console.log(err));
    }
    sortirajPoAdresiDesc = (req: express.Request, res: express.Response) => {
        Restoran.find().sort({ adresa: -1 }) 
        .then((restorani) => {
            res.json(restorani);
        })
        .catch((err) => console.log(err));
    }
    sortirajPoTipuAsc = (req: express.Request, res: express.Response) => {
        Restoran.find().sort({ tip: 1 }) 
        .then((restorani) => {
            res.json(restorani);
        })
        .catch((err) => console.log(err));
    }
    sortirajPoTipuDesc = (req: express.Request, res: express.Response) => {
        Restoran.find().sort({ tip: -1 }) 
        .then((restorani) => {
            res.json(restorani);
        })
        .catch((err) => console.log(err));
    }

    pretraga = (req: express.Request, res: express.Response) => { 
        let naziv = req.body.naziv
        let adresa = req.body.adresa
        let tip = req.body.tip
        Restoran.find({naziv:{$regex: naziv}, adresa:{$regex: adresa}, tip:{$regex: tip}})
        .then((restorani) => {
            res.json(restorani);
        })
        .catch((err) => console.log(err));
    }

    promeniStatusStola = (req: express.Request, res: express.Response) => { 
        let naziv = req.body.naziv
        let stoId = parseInt(req.body.sto)
        
        Restoran.findOne({naziv:naziv}).then((restoran) => {
            let lista = restoran?.stolovi;
            lista?.forEach(sto => {
                if(sto.id==stoId) {
                    sto.status="rezervisan";
                }
            });
            Restoran.updateOne({ naziv:naziv }, { $set: { stolovi: lista } }).then(ok=>{
                res.json({ 'msg': 'ok' })
            })
            
        }).catch((err) => console.log(err));
    }

    pojavili = (req: express.Request, res: express.Response) => { 
        let naziv = req.body.naziv
        let stoId = parseInt(req.body.sto)
        
        let danas = new Date();
        let zaTriSata = new Date(danas.getTime() + 3 * 60 * 60 * 1000);
        
        Restoran.findOne({naziv:naziv}).then((restoran) => {
            if (!restoran) {
                return res.status(404).json({ msg: 'Restoran nije pronađen' });
            }
            let lista = restoran?.stolovi;
            lista?.forEach(sto => {
                if(sto.id==stoId) {
                    sto.status="slobodan";
                }
            });
            Restoran.updateOne({ naziv:naziv,updatedAt: { $lte: zaTriSata } },{ $set: { stolovi: lista } }).then(ok=>{
                res.json({ 'msg': 'ok' })
            })
            
        }).catch((err) => console.log(err));
    }

    nisuPojavili = (req: express.Request, res: express.Response) => { 
        let naziv = req.body.naziv
        let stoId = parseInt(req.body.sto)
        
        Restoran.findOne({naziv:naziv}).then((restoran) => {
            let lista = restoran?.stolovi;
            lista?.forEach(sto => {
                if(sto.id==stoId) {
                    sto.status="slobodan";
                }
            });
            Restoran.updateOne({ naziv:naziv }, { $set: { stolovi: lista } }).then(ok=>{
                res.json({ 'msg': 'ok' })
            })
            
        }).catch((err) => console.log(err));
    }

    dodajRestoran = (req: express.Request, res: express.Response) => {
        let restoran = new Restoran ({
            naziv: req.body.naziv,
            adresa: req.body.adresa,
            tip: req.body.tip,
            telefon: req.body.telefon,
            radno_vreme: req.body.radno_vreme,
            konobari: req.body.konobari,
            stolovi: req.body.stolovi,
            jelovnik: [],
            raspored: req.body.raspored
        })

        restoran.save().then((p) => {
            res.status(200).json({ message: "ok" });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({ message: "error" });
          });
    }

    dodajKonobara = (req: express.Request, res: express.Response) => {
        let restoran = req.body.restoran
        let newUser = new User ({
            korisnickoIme: req.body.korisnickoIme,
            lozinka: btoa(req.body.lozinka),
            pitanje: req.body.pitanje,
            odgovor: req.body.odgovor,
            ime: req.body.ime,
            prezime: req.body.prezime,
            pol: req.body.pol,
            adresa: req.body.adresa,
            telefon: req.body.telefon,
            mejl: req.body.mejl,
            brKartice: req.body.brKartice,
            slika: req.body.slika,
            tip: 'konobar',
            korpa: [],
            restoran: restoran,
            status:'prihvacen'
        })

        Restoran.findOne({ naziv: restoran }).then((r) => {
            let lista = r?.konobari || [];
        
            lista.push(newUser);
        
            Restoran.updateOne({ naziv: restoran },{ $set: { konobari: lista } } ).then(() => {
                res.json({ msg: 'ok' });
            }).catch((err) => {
                console.error(err);
            });
        }).catch((err) => {
            console.error(err);
        });

        
    }

}