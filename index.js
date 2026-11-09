const express = require('express');
const app = express();

//naglasavamo da ce server obradivati json body u zahtjevima koji dolazi
app.use(express.json());


const PORT = 8000;
// RUTA/endpoint ="/" (root ruta, defaultni endpoint)
// HTTP metoda= GET
//prvi param = HTTP request
// drugi param = HTTP response
// '/' se dodaje na kraju url
app.get('/', (req, res) => {
  console.log("Pozvana je GET metoda na defaultnim endpointom")
  res.send("Poz iz Express.js servera")
});

//probica
// ovo je na bazi save
let pizze=[
  {id:1, naziv:"Margerita",cijena:35},
  {id:2, naziv:"FAntasia",cijena:25},
  {id:3, naziv:"CApricisa",cijena:17},
  {id:4,naziv:"Fantasia",cijena:14},
  {id:5,naziv:"Mortdela",cijena:17},

]


// URL parametar koristi se za dohvat pojedinačnog (1) resursa

app.get("/pizze/:naziv", (req, res) => {
  let naziv_param = req.params.naziv;

  //kor.salje podatke u krivom formatu -400
  if (!isNaN(naziv_param)) {
    return res.status(400).json({ message: "Naziv pizze ne smije biti broj" });
  }

  let pizza = pizze.find(
    p => p.naziv.toLowerCase() == naziv_param.toLowerCase()
  );

  if (!pizza) {
    return res.status(404).json({ message: "Pizza ne postoji" });
  }

  return res.status(200).json(pizza);
});


// HTTp klijent (web preglednik) šalje zahtjeve HTTP GET zahtjev na posluzitelj
// Express.js poslužitelj na GET /pizze 

// ovaj end point vraca niz svih pizza
app.get("/pizze", (req,res)=>{
  console.log("Pozvana je GET metoda na /pizze endpointu")
  res.json(pizze)
})

//RWST API
//NEMA GLAGOLA
//nova pizza kor. salje iz hhtp body(tijelo http zahtjeva)

//VALIDACIJA PODATAKA U DOLAZNOM HTTP ZAHTJEVU
app.post("/pizze",(req,res)=>{
  let nova_pizza=req.body; //naziv, cijena
  


  let pizza_postoji = pizze.find(pizza => pizza.naziv.toLocaleLowerCase()==nova_pizza.naziv.toLocaleLowerCase(),
);

if(pizza_postoji){
  return res.status(409).json({message: "pizza s tim nazivom vec postoji"})
}
let novi_id = pizze.at(-1).id +   1;
  nova_pizza.id = novi_id;
pizze.push(nova_pizza);
return res.status(201).json({message:"Pizza je dodana", pizze:pizze })
});



/*
moja proba
let narudzbe=[]

app.get("/narudzbe", (req,res)=>{
  if(!narudzbe.length){
  return res.status(404).json({message: "polje prazno"})
  }
   return res.status(200).json(narudzbe);
});

//ovo gliča
app.get("/narudzbe/:id", (req, res) => {
  let id_param = req.params.id;


  let narudzba = narudzbe.find(
    p => p.id == id_param
  );

  if (!narudzbe) {
    return res.status(404).json({ message: "ne postoji" });
  }

  return res.status(200).json(narudzba);
});

//jos post za narudzbu*/

let narudzbe = [];

// GET /narudzbe - vraća sve narudžbe
app.get("/narudzbe", (req, res) => {
  if (!narudzbe.length) {
    return res.status(404).json({ message: "Nema narudžbi" });
  }
  return res.status(200).json(narudzbe);
});

// GET /narudzbe/:id - vraća jednu narudžbu
app.get("/narudzbe/:id", (req, res) => {
  let id_param = Number(req.params.id);

  if (isNaN(id_param)) {
    return res.status(400).json({ message: "ID mora biti broj" });
  }

  let narudzba = narudzbe.find(n => n.id === id_param);

  if (!narudzba) {
    return res.status(404).json({ message: "Narudžba ne postoji" });
  }

  return res.status(200).json(narudzba);
});

// POST /narudzbe - dodaje novu narudžbu
app.post("/narudzbe", (req, res) => {
  let nova_narudzba = req.body; // npr. { "pizza": "Margerita", "kolicina": 2 }

  // validacija podataka
  if (
    !nova_narudzba.pizza ||
    typeof nova_narudzba.pizza !== "string" ||
    !Number.isInteger(nova_narudzba.kolicina) ||
    nova_narudzba.kolicina < 1
  ) {
    return res.status(400).json({
      message: "Potrebni su pizza (string) i kolicina (cijeli broj >= 1)"
    });
  }

  // provjera postoji li pizza na jelovniku
  let pizza = pizze.find(
    p => p.naziv.toLowerCase() === nova_narudzba.pizza.toLowerCase()
  );

  if (!pizza) {
    return res.status(404).json({ message: "Pizza ne postoji" });
  }

  // novi id + izračun ukupne cijene
  nova_narudzba.id = narudzbe.length ? narudzbe.at(-1).id + 1 : 1;
  nova_narudzba.ukupno = pizza.cijena * nova_narudzba.kolicina;

  narudzbe.push(nova_narudzba);

  return res.status(201).json(nova_narudzba);
});



app.listen(PORT, error => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Justo dela  na ${PORT} portu`);
  }
});