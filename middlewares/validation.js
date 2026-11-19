
const { body, param, validationResult } = require('express-validator');

// Vérifier les erreurs
const verifierErreurs = (req, res, next) => {
    const erreurs = validationResult(req);

    if (!erreurs.isEmpty()) {
        return res.status(400).json({
            message: 'Les données envoyées sont invalides',
            erreurs: erreurs.array().map(erreur => ({
                champ: erreur.path,
                message: erreur.msg
            }))
        });
    }

    next();
};

// Vérifier les identifiants
exports.validerId = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('L identifiant doit être un nombre entier positif'),
    verifierErreurs
];

// Ajouter un utilisateur
exports.validerAjoutUtilisateur = [
    body('nom').trim().notEmpty()
        .withMessage('Le nom est obligatoire'),

    body('prenom').trim().notEmpty()
        .withMessage('Le prénom est obligatoire'),

    body('email')
        .trim()
        .notEmpty().withMessage('L email est obligatoire')
        .isEmail().withMessage('Adresse email invalide'),

    body('password')
        .notEmpty().withMessage('Le mot de passe est obligatoire')
        .isLength({ min: 8 })
        .withMessage('Le mot de passe doit contenir au moins 8 caractères'),

    body('telephone').trim().notEmpty()
        .withMessage('Le téléphone est obligatoire'),

    verifierErreurs
];

// Modifier un utilisateur
exports.validerModifUtilisateur = [
    body('nom').optional().trim().notEmpty()
        .withMessage('Le nom ne peut pas être vide'),

    body('prenom').optional().trim().notEmpty()
        .withMessage('Le prénom ne peut pas être vide'),

    body('email').optional().trim().isEmail()
        .withMessage('Adresse email invalide'),

    body('password').optional().isLength({ min: 8 })
        .withMessage('Le mot de passe doit contenir au moins 8 caractères'),

    body('telephone').optional().trim().notEmpty()
        .withMessage('Le téléphone ne peut pas être vide'),

    verifierErreurs
];

// Connexion
exports.validerConnexion = [
    body('email').trim().notEmpty()
        .withMessage('L email est obligatoire')
        .isEmail().withMessage('Adresse email invalide'),

    body('password').notEmpty()
        .withMessage('Le mot de passe est obligatoire'),

    verifierErreurs
];

// Ajouter une catégorie
exports.validerAjoutCategorie = [
    body('nom').trim().notEmpty()
        .withMessage('Le nom de la catégorie est obligatoire')
        .isLength({ max: 100 })
        .withMessage('Le nom ne doit pas dépasser 100 caractères'),

    body('description').optional().isLength({ max: 255 })
        .withMessage('La description ne doit pas dépasser 255 caractères'),

    verifierErreurs
];

// Modifier une catégorie
exports.validerModifCategorie = [
    body('nom').optional().trim().notEmpty()
        .withMessage('Le nom de la catégorie ne peut pas être vide')
        .isLength({ max: 100 })
        .withMessage('Le nom ne doit pas dépasser 100 caractères'),

    body('description').optional().isLength({ max: 255 })
        .withMessage('La description ne doit pas dépasser 255 caractères'),

    verifierErreurs
];

// Ajouter une photo
exports.validerAjoutPhoto = [
    body('id_objet').notEmpty()
        .withMessage('L id de l objet est obligatoire')
        .bail()
        .isInt({ min: 1 })
        .withMessage('L id de l objet doit être un nombre entier positif'),

    verifierErreurs
];

// Modifier une photo
exports.validerModifPhoto = [
    body('id_objet').optional().isInt({ min: 1 })
        .withMessage('L id de l objet doit être un nombre entier positif'),

    verifierErreurs
];
