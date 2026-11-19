
const express = require('express');
const router = express.Router();

const utilisateurController = require('../controllers/UtilisateurController');
const verifierToken = require('../middlewares/auth');

const {
    validerId,
    validerAjoutUtilisateur,
    validerModifUtilisateur,
    validerConnexion
} = require('../middlewares/validation');

// Inscription
router.post(
    '/',
    validerAjoutUtilisateur,
    utilisateurController.ajouterUtilisateur
);

// Connexion
router.post(
    '/login',
    validerConnexion,
    utilisateurController.connecterUtilisateur
);

// Routes protégées par JWT
router.get(
    '/',
    verifierToken,
    utilisateurController.afficherUtilisateurs
);

router.get(
    '/:id',
    verifierToken,
    validerId,
    utilisateurController.afficherUtilisateur
);

router.put(
    '/:id',
    verifierToken,
    validerId,
    validerModifUtilisateur,
    utilisateurController.modifierUtilisateur
);

router.delete(
    '/:id',
    verifierToken,
    validerId,
    utilisateurController.supprimerUtilisateur
);

module.exports = router;
