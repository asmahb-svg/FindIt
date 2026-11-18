const { Categorie } = require('../models');

// Afficher toutes les catégories
exports.afficherCategories = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limite = parseInt(req.query.limite, 10) || 10;

        if (page < 1 || limite < 1 || limite > 100) {
            return res.status(400).json({
                message: 'Les paramètres de pagination sont invalides'
            });
        }

        const resultat = await Categorie.findAndCountAll({
            limit: limite,
            offset: (page - 1) * limite,
            order: [['id_categorie', 'ASC']]
        });

        res.status(200).json({
            total: resultat.count,
            page,
            limite,
            categories: resultat.rows
        });
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de l affichage des catégories',
            erreur: erreur.message
        });
    }
};

// Afficher une catégorie par son ID
exports.afficherCategorie = async (req, res) => {
    try {
        const categorie = await Categorie.findByPk(req.params.id);

        if (!categorie) {
            return res.status(404).json({
                message: 'Catégorie introuvable'
            });
        }

        res.status(200).json(categorie);
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de la recherche de la catégorie',
            erreur: erreur.message
        });
    }
};

// Ajouter une catégorie
exports.ajouterCategorie = async (req, res) => {
    try {
        const { nom, description } = req.body;

        if (!nom || !nom.trim()) {
            return res.status(400).json({
                message: 'Le nom de la catégorie est obligatoire'
            });
        }

        const nouvelleCategorie = await Categorie.create({
            nom,
            description
        });

        res.status(201).json(nouvelleCategorie);
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de l ajout de la catégorie',
            erreur: erreur.message
        });
    }
};

// Modifier une catégorie
exports.modifierCategorie = async (req, res) => {
    try {
        const categorie = await Categorie.findByPk(req.params.id);

        if (!categorie) {
            return res.status(404).json({
                message: 'Catégorie introuvable'
            });
        }

        const { nom, description } = req.body;

        if (nom !== undefined && !nom.trim()) {
            return res.status(400).json({
                message: 'Le nom de la catégorie ne peut pas être vide'
            });
        }

        await categorie.update({
            nom: nom !== undefined ? nom : categorie.nom,
            description: description !== undefined
                ? description : categorie.description
        });

        res.status(200).json(categorie);
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de la modification de la catégorie',
            erreur: erreur.message
        });
    }
};

// Supprimer une catégorie
exports.supprimerCategorie = async (req, res) => {
    try {
        const categorie = await Categorie.findByPk(req.params.id);

        if (!categorie) {
            return res.status(404).json({
                message: 'Catégorie introuvable'
            });
        }

        await categorie.destroy();

        res.status(200).json({
            message: 'Catégorie supprimée avec succès'
        });
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de la suppression de la catégorie',
            erreur: erreur.message
        });
    }
};