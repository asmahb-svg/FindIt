const express = require('express');
const router = express.Router();

const utilisateurController = require('../controllers/UtilisateurController');

// Afficher tous les utilisateurs
router.get('/', utilisateurController.afficherUtilisateurs);

// Afficher un utilisateur par son ID
router.get('/:id', utilisateurController.afficherUtilisateur);

// Ajouter un utilisateur
router.post('/', utilisateurController.ajouterUtilisateur);

// Modifier un utilisateur
router.put('/:id', utilisateurController.modifierUtilisateur);

// Supprimer un utilisateur
router.delete('/:id', utilisateurController.supprimerUtilisateur);

module.exports = router;