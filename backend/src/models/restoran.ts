import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Restoran = new Schema({
    naziv: {
        type: String
    },
    adresa: {
        type: String
    },
    tip: {
        type: String
    },
    telefon: {
        type: String
    },
    radno_vreme: {
        type: Array
    },
    konobari: {
        type: Array
    },
    stolovi: {
        type: Array
    },
    jelovnik: {
        type: Array
    },
    raspored: {
        type: String
    }
})

export default mongoose.model('Restoran', Restoran, 'restorani');