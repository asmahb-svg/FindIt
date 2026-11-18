const express = require('express');
const router = express.Router();

const categorieController = require('../controllers/CategorieController');

// Routes pour la gestion des catégories
router.get('/', categorieController.afficherCategories);
router.get('/:id', categorieController.afficherCategorie);
router.post('/', categorieController.ajouterCategorie);
router.put('/:id', categorieController.modifierCategorie);
router.delete('/:id', categorieController.supprimerCategorie);

module.exports = router;