const express = require('express');
const router = express.Router();

const objetController = require('../controllers/ObjetController');
const {
    validerId,
    validerAjoutObjet,
    validerModifObjet
} = require('../middlewares/validation');

router.get('/', objetController.afficherObjets);
router.get('/:id', validerId, objetController.afficherObjet);
router.post('/', validerAjoutObjet, objetController.ajouterObjet);
router.put('/:id', validerId, validerModifObjet, objetController.modifierObjet);
router.delete('/:id', validerId, objetController.supprimerObjet);

module.exports = router;