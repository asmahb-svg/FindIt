
const express = require('express');
const router = express.Router();

const photoObjetController = require('../controllers/PhotoObjetController');
const verifierToken = require('../middlewares/auth');
const { uploadImage } = require('../middlewares/upload');

const {
    validerId,
    validerAjoutPhoto,
    validerModifPhoto
} = require('../middlewares/validation');

// Routes protégées par JWT
router.get('/', verifierToken, photoObjetController.afficherPhotos);

router.get(
    '/:id',
    verifierToken,
    validerId,
    photoObjetController.afficherPhoto
);

router.post(
    '/',
    verifierToken,
    uploadImage,
    validerAjoutPhoto,
    photoObjetController.ajouterPhoto
);

router.put(
    '/:id',
    verifierToken,
    validerId,
    uploadImage,
    validerModifPhoto,
    photoObjetController.modifierPhoto
);

router.delete(
    '/:id',
    verifierToken,
    validerId,
    photoObjetController.supprimerPhoto
);

module.exports = router;
