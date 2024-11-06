import express from 'express';
import { RestoranController } from '../controllers/restoran.controller';
const restoranRouter = express.Router();

restoranRouter.route('/broj').get(
    (req, res) => new RestoranController().broj(req, res)
)

restoranRouter.route('/dohvatiSve').get(
    (req, res) => new RestoranController().dohvatiSve(req, res)
)

restoranRouter.route('/sortirajPoNazivuAsc').get(
    (req, res) => new RestoranController().sortirajPoNazivuAsc(req, res)
)

restoranRouter.route('/sortirajPoNazivuDesc').get(
    (req, res) => new RestoranController().sortirajPoNazivuDesc(req, res)
)

restoranRouter.route('/sortirajPoAdresiAsc').get(
    (req, res) => new RestoranController().sortirajPoAdresiAsc(req, res)
)

restoranRouter.route('/sortirajPoAdresiDesc').get(
    (req, res) => new RestoranController().sortirajPoAdresiDesc(req, res)
)

restoranRouter.route('/sortirajPoTipuAsc').get(
    (req, res) => new RestoranController().sortirajPoTipuAsc(req, res)
)

restoranRouter.route('/sortirajPoTipuDesc').get(
    (req, res) => new RestoranController().sortirajPoTipuDesc(req, res)
)

restoranRouter.route('/pretraga').post(
    (req, res) => new RestoranController().pretraga(req, res)
)

restoranRouter.route('/promeniStatusStola').post(
    (req, res) => new RestoranController().promeniStatusStola(req, res)
)

restoranRouter.route('/dohvatiPoNazivu').post(
    (req, res) => new RestoranController().dohvatiPoNazivu(req, res)
)

restoranRouter.route('/pojavili').post(
    (req, res) => new RestoranController().pojavili(req, res)
)

restoranRouter.route('/nisuPojavili').post(
    (req, res) => new RestoranController().nisuPojavili(req, res)
)

restoranRouter.route('/dodajRestoran').post(
    (req, res) => new RestoranController().dodajRestoran(req, res)
)

restoranRouter.route('/dodajKonobara').post(
    (req, res) => new RestoranController().dodajKonobara(req, res)
)

export default restoranRouter;