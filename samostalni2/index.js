const express = require('express');
const nekretnineRouter = require('./routes/nekretnine');
const ponudeRouter = require('./routes/ponude');

const app = express();
app.use(express.json());

app.use('/nekretnine', nekretnineRouter);
app.use('/ponude', ponudeRouter);

app.listen(8000, () => console.log('Dela na portu 8000'));