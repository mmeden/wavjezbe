const express = require('express');
const router = express.Router();
const nekretnineRouter = require('./nekretnine');

let ponude = [];


router.get('/', (req, res) => {
  res.status(200).json(ponude);
});


router.post('/', (req, res) => {
  const { idNekretnine, imeKupca, prezimeKupca, ponudenaCijena, brojTelefona } = req.body;

  if (idNekretnine === undefined || !imeKupca || !prezimeKupca || ponudenaCijena === undefined || !brojTelefona) {
    return res.status(400).json({ poruka: 'Nisu poslani svi podaci' });
  }
  if (isNaN(idNekretnine)) {
    return res.status(400).json({ poruka: 'ID nekretnine mora biti broj' });
  }
  if (ponudenaCijena <= 0) {
    return res.status(400).json({ poruka: 'Ponuđena cijena mora biti veća od 0' });
  }
  if (!nekretnineRouter.postojiNekretnina(Number(idNekretnine))) {
    return res.status(404).json({ poruka: 'Nekretnina s tim ID-em ne postoji' });
  }

  const novaPonuda = {
    id: ponude.length ? ponude[ponude.length - 1].id + 1 : 1,
    idNekretnine: Number(idNekretnine),
    imeKupca,
    prezimeKupca,
    ponudenaCijena,
    brojTelefona
  };
  ponude.push(novaPonuda);
  res.status(201).json(novaPonuda);
});

module.exports = router;