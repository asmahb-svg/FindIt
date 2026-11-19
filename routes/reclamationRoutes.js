
const express = require('express');
const router = express.Router();

const reclamationController = require('../controllers/ReclamationController');
const verifierToken = require('../middlewares/auth');

// Routes protégées par JWT
router.get('/', verifierToken, reclamationController.afficherReclamations);
router.get('/:id', verifierToken, reclamationController.afficherReclamation);
router.post('/', verifierToken, reclamationController.ajouterReclamation);
router.put('/:id', verifierToken, reclamationController.modifierReclamation);
router.delete('/:id', verifierToken, reclamationController.supprimerReclamation);

module.exports = router;
