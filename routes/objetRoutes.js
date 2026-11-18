
const express = require('express');
const router = express.Router();

const objetController = require('../controllers/ObjetController');

router.get('/', objetController.afficherObjets);
router.get('/:id', objetController.afficherObjet);
router.post('/', objetController.ajouterObjet);
router.put('/:id', objetController.modifierObjet);
router.delete('/:id', objetController.supprimerObjet);

module.exports = router;
