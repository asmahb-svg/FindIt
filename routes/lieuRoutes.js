
const express = require('express');
const router = express.Router();

const lieuController = require('../controllers/LieuController');

console.log('Fichier lieuRoutes chargé');

// Routes pour la gestion des lieux
router.get('/', lieuController.afficherLieux);
router.get('/:id', lieuController.afficherLieu);
router.post('/', lieuController.ajouterLieu);
router.put('/:id', lieuController.modifierLieu);
router.delete('/:id', lieuController.supprimerLieu);

module.exports = router;
