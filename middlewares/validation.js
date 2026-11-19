
const { body, param, validationResult } = require('express-validator');

// Vérifier les erreurs de validation
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

// Validation de l'identifiant
exports.validerId = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('L identifiant doit être un nombre entier positif'),
    verifierErreurs
];

// Validation de l'ajout d'un utilisateur
exports.validerAjoutUtilisateur = [
    body('nom')
        .trim()
        .notEmpty().withMessage('Le nom est obligatoire')
        .isLength({ max: 100 }).withMessage('Le nom ne doit pas dépasser 100 caractères'),

    body('prenom')
        .trim()
        .notEmpty().withMessage('Le prénom est obligatoire')
        .isLength({ max: 100 }).withMessage('Le prénom ne doit pas dépasser 100 caractères'),

    body('email')
        .trim()
        .notEmpty().withMessage('L email est obligatoire')
        .isEmail().withMessage('L adresse email est invalide')
        .isLength({ max: 150 }).withMessage('L email ne doit pas dépasser 150 caractères'),

    body('password')
        .notEmpty().withMessage('Le mot de passe est obligatoire')
        .isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères'),

    body('telephone')
        .trim()
        .notEmpty().withMessage('Le téléphone est obligatoire')
        .isLength({ max: 20 }).withMessage('Le téléphone ne doit pas dépasser 20 caractères'),

    verifierErreurs
];

// Validation de la modification d'un utilisateur
exports.validerModifUtilisateur = [
    body('nom')
        .optional()
        .trim()
        .notEmpty().withMessage('Le nom ne peut pas être vide')
        .isLength({ max: 100 }).withMessage('Le nom ne doit pas dépasser 100 caractères'),

    body('prenom')
        .optional()
        .trim()
        .notEmpty().withMessage('Le prénom ne peut pas être vide')
        .isLength({ max: 100 }).withMessage('Le prénom ne doit pas dépasser 100 caractères'),

    body('email')
        .optional()
        .trim()
        .isEmail().withMessage('L adresse email est invalide')
        .isLength({ max: 150 }).withMessage('L email ne doit pas dépasser 150 caractères'),

    body('password')
        .optional()
        .isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères'),

    body('telephone')
        .optional()
        .trim()
        .isLength({ max: 20 }).withMessage('Le téléphone ne doit pas dépasser 20 caractères'),

    verifierErreurs
];

// Validation de la connexion
exports.validerConnexion = [
    body('email')
        .trim()
        .notEmpty().withMessage('L email est obligatoire')
        .isEmail().withMessage('L adresse email est invalide'),

    body('password')
        .notEmpty().withMessage('Le mot de passe est obligatoire'),

    verifierErreurs
];

// Validation de l'ajout d'une catégorie
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

// Validation de la modification d'une catégorie
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

// Validation de l'ajout d'une photo
exports.validerAjoutPhoto = [
    body('id_objet')
        .notEmpty().withMessage('L id de l objet est obligatoire')
        .bail()
        .isInt({ min: 1 }).withMessage('L id de l objet doit être un nombre entier positif'),

    verifierErreurs
];

// Validation de la modification d'une photo
exports.validerModifPhoto = [
    body('id_objet')
        .optional()
        .isInt({ min: 1 }).withMessage('L id de l objet doit être un nombre entier positif'),

    verifierErreurs
];
