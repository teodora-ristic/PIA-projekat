import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
    korisnickoIme: {
        type: String
    },
    lozinka: {
        type: String
    },
    pitanje: {
        type: String
    },
    odgovor: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    pol: {
        type: String
    },
    adresa: {
        type: String
    },
    telefon: {
        type: String
    },
    mejl: {
        type: String
    },
    brKartice: {
        type: String
    },
    slika: {
        type: String
    },
    tip: {
        type: String
    },
    korpa: {
        type: Array
    },
    restoran: {
        type: String
    },
    status: {
        type:String
    }

})

export default mongoose.model('User', User, 'korisnici');