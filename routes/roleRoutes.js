
const express = require('express');
const router = express.Router();

const roleController = require('../controllers/RoleController');
const verifierToken = require('../middlewares/auth');
const autoriserRole = require('../middlewares/autorisation');

console.log('Fichier roleRoutes chargé');

// Routes réservées aux administrateurs
router.get('/', verifierToken, autoriserRole('Administrateur'), roleController.afficherRoles);
router.get('/:id', verifierToken, autoriserRole('Administrateur'), roleController.afficherRole);
router.post('/', verifierToken, autoriserRole('Administrateur'), roleController.ajouterRole);
router.put('/:id', verifierToken, autoriserRole('Administrateur'), roleController.modifierRole);
router.delete('/:id', verifierToken, autoriserRole('Administrateur'), roleController.supprimerRole);

module.exports = router;
