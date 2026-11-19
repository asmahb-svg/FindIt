
const express = require('express');
const router = express.Router();

const objetController = require('../controllers/ObjetController');
const verifierToken = require('../middlewares/auth');

// Toutes les routes nécessitent une authentification JWT
router.get('/', verifierToken, objetController.afficherObjets);
router.get('/:id', verifierToken, objetController.afficherObjet);
router.post('/', verifierToken, objetController.ajouterObjet);
router.put('/:id', verifierToken, objetController.modifierObjet);
router.delete('/:id', verifierToken, objetController.supprimerObjet);

module.exports = router;
