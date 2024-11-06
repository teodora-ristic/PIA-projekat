import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Rezervacija = new Schema({
    id: {
        type: Number
    },
    datum_vreme: {
        type: Date
    },
    ime: {
        type: String
    }, 
    prezime: {
        type: String
    }, 
    korisnickoIme: {
        type: String
    }, 
    naziv: {
        type: String
    },
    adresa: {
        type: String
    },
    sto: {
        type: Number
    },
    brOsoba: {
        type: Number
    },
    opis: {
        type: String
    },
    status: {
        type: String
    }, 
    konobar: {
        type: String
    },
    pojavili: {
        type: String
    },
    komentar: {
        type: String
    }

})

export default mongoose.model('Rezervacija', Rezervacija, 'rezervacije');