const express = require('express');
const router = express.Router();

const photoObjetController = require('../controllers/PhotoObjetController');

// Routes pour la gestion des photos des objets
router.get('/', photoObjetController.afficherPhotos);
router.get('/:id', photoObjetController.afficherPhoto);
router.post('/', photoObjetController.ajouterPhoto);
router.put('/:id', photoObjetController.modifierPhoto);
router.delete('/:id', photoObjetController.supprimerPhoto);

module.exports = router;