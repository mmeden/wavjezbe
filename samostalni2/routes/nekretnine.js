const express = require('express');
const router = express.Router();

let nekretnine = [
   {id: 1,
    naziv: 'Stan u centru',
    opis: 'Moderan stan',
    cijena: 150000,
    lokacija: 'Pula',
    brojSoba: 3,
    povrsina: 70},
  {id: 2,
    naziv: 'Kuća s vrtom',
    opis: 'Obiteljska kuća',
    cijena: 280000,
    lokacija: 'Zelenika',
    brojSoba: 5,
    povrsina: 160}
];


router.get('/', (req, res) => {
  res.status(200).json(nekretnine);
});


router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ poruka: 'ID mora biti broj' });
  }

  const nekretnina = nekretnine.find(n => n.id === id);
  if (!nekretnina) {
    return res.status(404).json({ poruka: 'Nekretnina nije pronađena' });
  }
  res.status(200).json(nekretnina);
});


router.post('/', (req, res) => {
  const { naziv, opis, cijena, lokacija, brojSoba, povrsina } = req.body;

  if (!naziv || !opis || !lokacija || cijena === undefined || brojSoba === undefined || povrsina === undefined) {
    return res.status(400).json({ poruka: 'Nisu poslani svi podaci' });
  }
  if (cijena <= 0 || brojSoba <= 0 || povrsina <= 0) {
    return res.status(400).json({ poruka: 'Cijena, broj soba i površina moraju biti veći od 0' });
  }

  const novaNekretnina = {
    id: nekretnine.length ? nekretnine[nekretnine.length - 1].id + 1 : 1,
    naziv, opis, cijena, lokacija, brojSoba, povrsina
  };
  nekretnine.push(novaNekretnina);
  res.status(201).json(novaNekretnina);
});


router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ poruka: 'ID mora biti broj' });
  }

  const nekretnina = nekretnine.find(n => n.id === id);
  if (!nekretnina) {
    return res.status(404).json({ poruka: 'Nekretnina nije pronađena' });
  }

  const { naziv, opis, cijena, lokacija, brojSoba, povrsina } = req.body;
  if (!naziv || !opis || !lokacija || cijena === undefined || brojSoba === undefined || povrsina === undefined) {
    return res.status(400).json({ poruka: 'Nisu poslani svi podaci' });
  }
  if (cijena <= 0 || brojSoba <= 0 || povrsina <= 0) {
    return res.status(400).json({ poruka: 'Cijena, broj soba i površina moraju biti veći od 0' });
  }

  nekretnina.naziv = naziv;
  nekretnina.opis = opis;
  nekretnina.cijena = cijena;
  nekretnina.lokacija = lokacija;
  nekretnina.brojSoba = brojSoba;
  nekretnina.povrsina = povrsina;
  res.status(200).json(nekretnina);
});


router.patch('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ poruka: 'ID mora biti broj' });
  }

  const nekretnina = nekretnine.find(n => n.id === id);
  if (!nekretnina) {
    return res.status(404).json({ poruka: 'Nekretnina nije pronađena' });
  }

  const { naziv, opis, cijena, lokacija, brojSoba, povrsina } = req.body;
  if (cijena !== undefined && cijena <= 0) {
    return res.status(400).json({ poruka: 'Cijena mora biti veća od 0' });
  }
  if (brojSoba !== undefined && brojSoba <= 0) {
    return res.status(400).json({ poruka: 'Broj soba mora biti veći od 0' });
  }
  if (povrsina !== undefined && povrsina <= 0) {
    return res.status(400).json({ poruka: 'Površina mora biti veća od 0' });
  }

  if (naziv !== undefined) nekretnina.naziv = naziv;
  if (opis !== undefined) nekretnina.opis = opis;
  if (cijena !== undefined) nekretnina.cijena = cijena;
  if (lokacija !== undefined) nekretnina.lokacija = lokacija;
  if (brojSoba !== undefined) nekretnina.brojSoba = brojSoba;
  if (povrsina !== undefined) nekretnina.povrsina = povrsina;
  res.status(200).json(nekretnina);
});


router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ poruka: 'ID mora biti broj' });
  }

  const nekretnina = nekretnine.find(n => n.id === id);
  if (!nekretnina) {
    return res.status(404).json({ poruka: 'Nekretnina nije pronađena' });
  }

  nekretnine = nekretnine.filter(n => n.id !== id);
  res.status(200).json({ poruka: 'Nekretnina obrisana' });
});


router.postojiNekretnina = (id) => nekretnine.some(n => n.id === id);

module.exports = router;