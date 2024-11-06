import express from 'express';
import { DostavaController } from '../controllers/dostava.controller';
const dostavaRouter = express.Router();

dostavaRouter.route('/dohvatiZaKorisnika').post(
    (req, res) => new DostavaController().dohvatiZaKorisnika(req, res)
)

dostavaRouter.route('/dohvatiZaRestoran').post(
    (req, res) => new DostavaController().dohvatiZaRestoran(req, res)
)

dostavaRouter.route('/potvrdi').post(
    (req, res) => new DostavaController().potvrdi(req, res)
)

dostavaRouter.route('/odbij').post(
    (req, res) => new DostavaController().odbij(req, res)
)

dostavaRouter.route('/dodaj').post(
    (req, res) => new DostavaController().dodaj(req, res)
)

export default dostavaRouter;