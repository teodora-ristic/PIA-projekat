import express from 'express';
import { RezervacijaController } from '../controllers/rezervacija.controller';
const rezervacijaRouter = express.Router();

rezervacijaRouter.route('/dohvatiSve').get(
    (req, res) => new RezervacijaController().dohvatiSve(req, res)
)

rezervacijaRouter.route('/dodajRezervaciju').post(
    (req, res) => new RezervacijaController().dodajRezervaciju(req, res)
)

rezervacijaRouter.route('/dohvatiZaKorisnika').post(
    (req, res) => new RezervacijaController().dohvatiZaKorisnika(req, res)
)

rezervacijaRouter.route('/dohvatiNeobradjeneZaRestoran').post(
    (req, res) => new RezervacijaController().dohvatiNeobradjeneZaRestoran(req, res)
)

rezervacijaRouter.route('/dohvatiZaRestoran').post(
    (req, res) => new RezervacijaController().dohvatiNeobradjeneZaRestoran(req, res)
)

rezervacijaRouter.route('/prihvati').post(
    (req, res) => new RezervacijaController().prihvati(req, res)
)

rezervacijaRouter.route('/odbij').post(
    (req, res) => new RezervacijaController().odbij(req, res)
)

rezervacijaRouter.route('/dohvatiZaKonobara').post(
    (req, res) => new RezervacijaController().dohvatiZaKonobara(req, res)
)

rezervacijaRouter.route('/pojavili').post(
    (req, res) => new RezervacijaController().pojavili(req, res)
)

rezervacijaRouter.route('/nisuPojavili').post(
    (req, res) => new RezervacijaController().nisuPojavili(req, res)
)

export default rezervacijaRouter;