
const express = require('express');
const router = express.Router();

const reclamationController = require('../controllers/ReclamationController');

// Routes pour la gestion des réclamations
router.get('/', reclamationController.afficherReclamations);
router.get('/:id', reclamationController.afficherReclamation);
router.post('/', reclamationController.ajouterReclamation);
router.put('/:id', reclamationController.modifierReclamation);
router.delete('/:id', reclamationController.supprimerReclamation);

module.exports = router;
