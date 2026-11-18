const express = require('express');
const router = express.Router();

const photoObjetController = require('../controllers/PhotoObjetController');
const { uploadImage } = require('../middlewares/upload');

// Routes pour la gestion des photos des objets
router.get('/', photoObjetController.afficherPhotos);
router.get('/:id', photoObjetController.afficherPhoto);
router.post('/', uploadImage, photoObjetController.ajouterPhoto);
router.put('/:id', uploadImage, photoObjetController.modifierPhoto);
router.delete('/:id', photoObjetController.supprimerPhoto);

module.exports = router;