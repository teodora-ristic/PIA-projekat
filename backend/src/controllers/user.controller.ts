import * as express from 'express';
import User from '../models/user'


export class UserController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = btoa(req.body.password);

        User.findOne({ 'korisnickoIme': username, 'lozinka': password}).then(user=>{
            res.json(user)
        }).catch(err=>{
            console.log(err)
        })
    }

    getUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.findOne({ 'korisnickoIme': username }).then(user=>{
            res.json(user)
        }).catch(err=>{
            console.log(err)
        })
    }

    dohvatiSve = (req: express.Request, res: express.Response) => { 
        User.find().then(users=>{
            res.json(users)
        }).catch(err=>{
            console.log(err)
        })
    }

    registracija = (req: express.Request, res: express.Response) => {
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
            tip: 'gost',
            korpa: [],
            restoran: "",
            status:'neobradjen'
        })

        newUser.save().then((p) => {
            res.status(200).json({ message: "ok" });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({ message: "error" });
          });
    }

    promeniLozinku = (req: express.Request, res: express.Response) => { 
        let korisnickoIme = req.body.korisnickoIme
        let stara = btoa(req.body.stara)
        let nova = btoa(req.body.nova)
        User.findOneAndUpdate({"korisnickoIme": korisnickoIme, "lozinka": stara}, {$set:{"lozinka": nova}}).then((k) => {
            res.json(k);
        }).catch((err) => console.log(err));
    }

    broj = (req: express.Request, res: express.Response) => { 
        User.countDocuments({status:"prihvacen", "tip": "gost"}).then(cnt=>{
            res.json(cnt)
        }).catch(err=>{
            console.log(err)
        })
    }

    azuriraj = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme
        let ime = req.body.ime
        let prezime = req.body.prezime
        let adresa = req.body.adresa
        let mejl = req.body.mejl
        let telefon = req.body.telefon
        let brKartice = req.body.brKartice
        User.updateOne({"korisnickoIme": korisnickoIme}, {$set:{"ime": ime, "prezime": prezime, 
            "adresa": adresa, "mejl": mejl, "telefon": telefon, "brKartice": brKartice }}).then((p) => {
                res.json({ message: "ok" });
            }).catch((err) => {
                console.log(err);
            });
    }

    azuriraj2 = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme
        let ime = req.body.ime
        let prezime = req.body.prezime
        let adresa = req.body.adresa
        let mejl = req.body.mejl
        let telefon = req.body.telefon
        User.updateOne({"korisnickoIme": korisnickoIme}, {$set:{"ime": ime, "prezime": prezime, 
            "adresa": adresa, "mejl": mejl, "telefon": telefon}}).then((p) => {
                res.json({ message: "ok" });
            }).catch((err) => {
                console.log(err);
            });
    }

    azurirajSliku = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme
        let slika = req.body.slika
        User.updateOne({"korisnickoIme": korisnickoIme}, {$set:{"slika": slika }}).then((p) => {
                res.json({ message: "ok" });
            }).catch((err) => {
                console.log(err);
            });
    }

    dodajUKorpu = (req: express.Request, res: express.Response) => {
        let jelo = req.body.jelo;
        let korisnickoIme = req.body.korisnickoIme;
        User.updateOne({ korisnickoIme: korisnickoIme }, { $push: { korpa : { 'naziv': jelo.naziv, 'slika': jelo.slika,'cena': jelo.cena, 'sastojci':jelo.sastojci }} }).then(ok=>{
            res.json({ 'msg': 'ok' })
        }).catch(err=>{
            console.log(err);
        })
    }

    isprazniKorpu = (req: express.Request, res: express.Response) => { 
        let korisnickoIme = req.body.korisnickoIme;
        User.findOne({ korisnickoIme: korisnickoIme }).then((korsinik)=>{
            let korpa = korsinik?.korpa;
            korpa = []
            User.updateOne({ korisnickoIme:korisnickoIme }, { $set: { korpa: korpa } }).then(ok=>{
                res.json({ 'msg': 'ok' })
            })
        }).catch(err=>{
            console.log(err);
        })
    }

    dohvatiGoste = (req: express.Request, res: express.Response) => {
        User.find({tip:"gost",status:"prihvacen"}).then(users=>{
            res.json(users)
        }).catch(err=>{
            console.log(err)
        })
    }

    dohvatiKonobare = (req: express.Request, res: express.Response) => {
        User.find({tip:"konobar",status:"prihvacen"}).then(users=>{
            res.json(users)
        }).catch(err=>{
            console.log(err)
        })
    }

    prihvati = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme
        User.updateOne({"korisnickoIme": korisnickoIme}, {$set:{status: "prihvacen"}}).then((p) => {
                res.json({ message: "ok" });
            }).catch((err) => {
                console.log(err);
            });
    }

    odbij = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme
        User.updateOne({"korisnickoIme": korisnickoIme}, {$set:{status: "odbijen"}}).then((p) => {
                res.json({ message: "ok" });
            }).catch((err) => {
                console.log(err);
            });
    }

    dodajKonobara = (req: express.Request, res: express.Response) => {
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
            restoran: req.body.restoran,
            status:'prihvacen'
        })

        newUser.save().then((p) => {
            res.status(200).json({ message: "ok" });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({ message: "error" });
          });
    }

    dohvatiKonobareR = (req: express.Request, res: express.Response) => {
        let restoran = req.body.restoran
        User.find({tip:"konobar",status:"prihvacen",restoran: restoran}).then(users=>{
            res.json(users)
        }).catch(err=>{
            console.log(err)
        })
    }


    azurirajSve = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme
        let korisnickoImeN = req.body.korisnickoImeN
        let ime = req.body.ime
        let prezime = req.body.prezime
        let pol = req.body.pol
        let adresa = req.body.adresa
        let mejl = req.body.mejl
        let telefon = req.body.telefon
        let brKartice = req.body.brKartice
        let restoran = req.body.restoran
        User.updateOne({"korisnickoIme": korisnickoIme}, {$set:{"korisnickoIme": korisnickoImeN,"ime": ime, "prezime": prezime, 
            "pol": pol, "adresa": adresa, "mejl": mejl, "telefon": telefon, "brKartice": brKartice, "restoran":restoran }}).then((p) => {
                res.json({ message: "ok" });
            }).catch((err) => {
                console.log(err);
            });
    }

    dohvatiNeobradjene = (req: express.Request, res: express.Response) => { 
        User.find({status:'neobradjen'}).then(users=>{
            res.json(users)
        }).catch(err=>{
            console.log(err)
        })
    }
    
    
}

