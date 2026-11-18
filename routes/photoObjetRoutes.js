const express = require('express');
const router = express.Router();

const photoObjetController = require('../controllers/PhotoObjetController');
const { uploadImage } = require('../middlewares/upload');
const {
    validerId,
    validerAjoutPhoto,
    validerModifPhoto
} = require('../middlewares/validation');

// Routes pour la gestion des photos des objets
router.get('/', photoObjetController.afficherPhotos);
router.get('/:id', validerId, photoObjetController.afficherPhoto);
router.post('/', uploadImage, validerAjoutPhoto, photoObjetController.ajouterPhoto);
router.put('/:id', validerId, uploadImage, validerModifPhoto, photoObjetController.modifierPhoto);
router.delete('/:id', validerId, photoObjetController.supprimerPhoto);

module.exports = router;