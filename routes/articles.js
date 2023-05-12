const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send(
    'Récupérer take articles à partir de la position skip  take (nombre éléments )skip (offset à partir de laquelle on extrait les données de la base)'
  );
});

router.get('/:id', (req, res) => {
  res.send('Récupérer un article ayant l id donné');
});

router.post('/', (req, res) => {
  res.send('Ajouter un nouveau article envoyé sous format JSON ');
});

router.patch('/', (req, res) => {
  res.send(
    'Mettre à jour larticle envoyé dans le corps de la requête.    '
  );
});

router.delete('/:id', (req, res) => {
  res.send('Supprimer un article ayant l id donné');
});
