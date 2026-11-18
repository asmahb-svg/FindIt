const express = require('express');
const router = express.Router();

const categorieController = require('../controllers/CategorieController');
const {
    validerId,
    validerAjoutCategorie,
    validerModifCategorie
} = require('../middlewares/validation');

// Routes pour la gestion des catégories
router.get('/', categorieController.afficherCategories);
router.get('/:id', validerId, categorieController.afficherCategorie);
router.post('/', validerAjoutCategorie, categorieController.ajouterCategorie);
router.put('/:id', validerId, validerModifCategorie, categorieController.modifierCategorie);
router.delete('/:id', validerId, categorieController.supprimerCategorie);

module.exports = router;