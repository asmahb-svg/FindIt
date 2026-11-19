
const express = require('express');
const router = express.Router();

const categorieController = require('../controllers/CategorieController');
const verifierToken = require('../middlewares/auth');

const {
    validerId,
    validerAjoutCategorie,
    validerModifCategorie
} = require('../middlewares/validation');

// Routes protégées par JWT et validations
router.get('/', verifierToken, categorieController.afficherCategories);

router.get(
    '/:id',
    verifierToken,
    validerId,
    categorieController.afficherCategorie
);

router.post(
    '/',
    verifierToken,
    validerAjoutCategorie,
    categorieController.ajouterCategorie
);

router.put(
    '/:id',
    verifierToken,
    validerId,
    validerModifCategorie,
    categorieController.modifierCategorie
);

router.delete(
    '/:id',
    verifierToken,
    validerId,
    categorieController.supprimerCategorie
);

module.exports = router;
