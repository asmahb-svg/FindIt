
const express = require('express');
const router = express.Router();

const declarationController = require('../controllers/DeclarationController');
const verifierToken = require('../middlewares/auth');

// Toutes les routes nécessitent une authentification JWT
router.get('/', verifierToken, declarationController.afficherDeclarations);
router.get('/:id', verifierToken, declarationController.afficherDeclaration);
router.post('/', verifierToken, declarationController.ajouterDeclaration);
router.put('/:id', verifierToken, declarationController.modifierDeclaration);
router.delete('/:id', verifierToken, declarationController.supprimerDeclaration);

module.exports = router;
