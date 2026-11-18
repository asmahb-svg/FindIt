
const express = require('express');
const router = express.Router();

const categorieController = require('../controllers/CategorieController');

// Afficher toutes les catégories
router.get('/', categorieController.getAllCategories);

// Afficher une catégorie par ID
router.get('/:id', categorieController.getCategorieById);

// Ajouter une catégorie
router.post('/', categorieController.createCategorie);

// Modifier une catégorie
router.put('/:id', categorieController.updateCategorie);

// Supprimer une catégorie
router.delete('/:id', categorieController.deleteCategorie);

module.exports = router;
