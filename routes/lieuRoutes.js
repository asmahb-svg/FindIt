
const express = require('express');
const router = express.Router();

const lieuController = require('../controllers/LieuController');
const verifierToken = require('../middlewares/auth');

console.log('Fichier lieuRoutes chargé');

// Routes protégées par JWT
router.get('/', verifierToken, lieuController.afficherLieux);
router.get('/:id', verifierToken, lieuController.afficherLieu);
router.post('/', verifierToken, lieuController.ajouterLieu);
router.put('/:id', verifierToken, lieuController.modifierLieu);
router.delete('/:id', verifierToken, lieuController.supprimerLieu);

module.exports = router;
