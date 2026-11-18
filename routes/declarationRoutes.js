
const express = require('express');
const router = express.Router();

const declarationController = require('../controllers/DeclarationController');

// Routes pour les déclarations
router.get('/', declarationController.afficherDeclarations);
router.get('/:id', declarationController.afficherDeclaration);
router.post('/', declarationController.ajouterDeclaration);
router.put('/:id', declarationController.modifierDeclaration);
router.delete('/:id', declarationController.supprimerDeclaration);

module.exports = router;
