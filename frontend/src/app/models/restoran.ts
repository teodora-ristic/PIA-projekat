import Jelo from "./jelo";
import Radno from "./radno";
import Sto from "./sto";
import User from "./user";

export default class Restoran {
  naziv: string = "";
  adresa: string= "";
  tip: string= "";
  telefon: string= "";
  radno_vreme: Radno[] = [];
  stolovi: Sto[] = [];
  konobari: User[] = [];
  jelovnik: Jelo[] = [];
  raspored: string = "";
}
