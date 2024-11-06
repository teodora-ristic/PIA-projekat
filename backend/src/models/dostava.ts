import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Dostava = new Schema({
    id: {
        type: Number
    },
    korisnickoIme:  {
        type: String
    },
    naziv: {
        type: String
    },
    status: {
        type: String
    },
    vreme_od: {
        type: Number
    },
    vreme_do: {
        type: Number
    },
    datum: {
        type: Date
    },
    racun: {
        type: Number
    }


})

export default mongoose.model('Dostava', Dostava, 'dostave');