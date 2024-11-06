import express from 'express';
import { UserController } from '../controllers/user.controller';
const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)

userRouter.route('/getUser').post(
    (req, res) => new UserController().getUser(req, res)
)

userRouter.route('/registracija').post(
    (req, res) => new UserController().registracija(req, res)
)

userRouter.route('/dohvatiSve').get(
    (req, res) => new UserController().dohvatiSve(req, res)
)

userRouter.route('/promeniLozinku').post(
    (req, res) => new UserController().promeniLozinku(req, res)
)

userRouter.route('/broj').get(
    (req, res) => new UserController().broj(req, res)
)

userRouter.route('/azuriraj').post(
    (req, res) => new UserController().azuriraj(req, res)
)


userRouter.route('/azuriraj2').post(
    (req, res) => new UserController().azuriraj2(req, res)
)

userRouter.route('/azurirajSliku').post(
    (req, res) => new UserController().azurirajSliku(req, res)
)

userRouter.route('/dodajUKorpu').post(
    (req, res) => new UserController().dodajUKorpu(req, res)
)

userRouter.route('/isprazniKorpu').post(
    (req, res) => new UserController().isprazniKorpu(req, res)
)

userRouter.route('/dohvatiGoste').get(
    (req, res) => new UserController().dohvatiGoste(req, res)
)

userRouter.route('/dohvatiKonobare').get(
    (req, res) => new UserController().dohvatiKonobare(req, res)
)

userRouter.route('/prihvati').post(
    (req, res) => new UserController().prihvati(req, res)
)

userRouter.route('/odbij').post(
    (req, res) => new UserController().odbij(req, res)
)

userRouter.route('/dodajKonobara').post(
    (req, res) => new UserController().dodajKonobara(req, res)
)

userRouter.route('/dohvatiKonobareR').post(
    (req, res) => new UserController().dohvatiKonobareR(req, res)
)

userRouter.route('/azurirajSve').post(
    (req, res) => new UserController().azurirajSve(req, res)
)

userRouter.route('/dohvatiNeobradjene').get(
    (req, res) => new UserController().dohvatiNeobradjene(req, res)
)

export default userRouter;