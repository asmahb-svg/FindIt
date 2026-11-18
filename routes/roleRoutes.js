
const express = require('express');
const router = express.Router();

const roleController = require('../controllers/RoleController');

console.log('Fichier roleRoutes chargé');

// Routes pour la gestion des rôles
router.get('/', roleController.afficherRoles);
router.get('/:id', roleController.afficherRole);
router.post('/', roleController.ajouterRole);
router.put('/:id', roleController.modifierRole);
router.delete('/:id', roleController.supprimerRole);

module.exports = router;
