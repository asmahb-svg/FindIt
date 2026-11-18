const { body, param, validationResult } = require('express-validator');

// Vérifier s'il y a des erreurs de validation
const verifierErreurs = (req, res, next) => {
    const erreurs = validationResult(req);

    if (!erreurs.isEmpty()) {
        return res.status(400).json({
            message: 'Les données envoyées sont invalides',
            erreurs: erreurs.array().map(e => ({
                champ: e.path || e.param,
                message: e.msg
            }))
        });
    }

    next();
};

// Valider l'ID dans l'adresse (ex: /api/categories/2)
exports.validerId = [
    param('id')
        .isInt({ min: 1 }).withMessage('L id doit être un nombre entier positif'),
    verifierErreurs
];

// ===== CATEGORIE =====

// Ajouter une catégorie
exports.validerAjoutCategorie = [
    body('nom')
        .trim()
        .notEmpty().withMessage('Le nom de la catégorie est obligatoire')
        .isLength({ max: 100 }).withMessage('Le nom ne doit pas dépasser 100 caractères'),
    body('description')
        .optional()
        .isLength({ max: 255 }).withMessage('La description ne doit pas dépasser 255 caractères'),
    verifierErreurs
];

// Modifier une catégorie
exports.validerModifCategorie = [
    body('nom')
        .optional()
        .trim()
        .notEmpty().withMessage('Le nom de la catégorie ne peut pas être vide')
        .isLength({ max: 100 }).withMessage('Le nom ne doit pas dépasser 100 caractères'),
    body('description')
        .optional()
        .isLength({ max: 255 }).withMessage('La description ne doit pas dépasser 255 caractères'),
    verifierErreurs
];

// ===== PHOTO OBJET =====

// Ajouter une photo
exports.validerAjoutPhoto = [
    body('id_objet')
        .notEmpty().withMessage('L id de l objet est obligatoire')
        .bail()
        .isInt({ min: 1 }).withMessage('L id de l objet doit être un nombre entier positif'),
    verifierErreurs
];

// Modifier une photo
exports.validerModifPhoto = [
    body('id_objet')
        .optional()
        .isInt({ min: 1 }).withMessage('L id de l objet doit être un nombre entier positif'),
    verifierErreurs
];