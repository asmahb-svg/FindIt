
const { Objet, Categorie } = require('../models');

// Afficher tous les objets
exports.afficherObjets = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limite = parseInt(req.query.limite, 10) || 10;

        if (page < 1 || limite < 1 || limite > 100) {
            return res.status(400).json({
                message: 'Les paramètres de pagination sont invalides'
            });
        }

        const resultat = await Objet.findAndCountAll({
            limit: limite,
            offset: (page - 1) * limite,
            order: [['id_objet', 'ASC']]
        });

        res.status(200).json({
            total: resultat.count,
            page,
            limite,
            objets: resultat.rows
        });
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de l affichage des objets',
            erreur: erreur.message
        });
    }
};

// Afficher un objet par son ID
exports.afficherObjet = async (req, res) => {
    try {
        const objet = await Objet.findByPk(req.params.id);

        if (!objet) {
            return res.status(404).json({
                message: 'Objet introuvable'
            });
        }

        res.status(200).json(objet);
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de la recherche de l objet',
            erreur: erreur.message
        });
    }
};

// Ajouter un objet
exports.ajouterObjet = async (req, res) => {
    try {
        const {
            id_categorie,
            nom,
            description,
            date_creation,
            statut
        } = req.body;

        if (!id_categorie || !nom || !nom.trim()) {
            return res.status(400).json({
                message: 'La catégorie et le nom sont obligatoires'
            });
        }

        const categorie = await Categorie.findByPk(id_categorie);

        if (!categorie) {
            return res.status(404).json({
                message: 'Catégorie introuvable'
            });
        }

        const nouvelObjet = await Objet.create({
            id_categorie,
            nom,
            description,
            date_creation,
            statut
        });

        res.status(201).json(nouvelObjet);
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de l ajout de l objet',
            erreur: erreur.message
        });
    }
};

// Modifier un objet
exports.modifierObjet = async (req, res) => {
    try {
        const objet = await Objet.findByPk(req.params.id);

        if (!objet) {
            return res.status(404).json({
                message: 'Objet introuvable'
            });
        }

        const {
            id_categorie,
            nom,
            description,
            date_creation,
            statut
        } = req.body;

        if (id_categorie !== undefined) {
            const categorie = await Categorie.findByPk(id_categorie);

            if (!categorie) {
                return res.status(404).json({
                    message: 'Catégorie introuvable'
                });
            }
        }

        if (nom !== undefined && !nom.trim()) {
            return res.status(400).json({
                message: 'Le nom ne peut pas être vide'
            });
        }

        await objet.update({
            id_categorie: id_categorie !== undefined
                ? id_categorie : objet.id_categorie,
            nom: nom !== undefined ? nom : objet.nom,
            description: description !== undefined
                ? description : objet.description,
            date_creation: date_creation !== undefined
                ? date_creation : objet.date_creation,
            statut: statut !== undefined ? statut : objet.statut
        });

        res.status(200).json(objet);
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de la modification de l objet',
            erreur: erreur.message
        });
    }
};

// Supprimer un objet
exports.supprimerObjet = async (req, res) => {
    try {
        const objet = await Objet.findByPk(req.params.id);

        if (!objet) {
            return res.status(404).json({
                message: 'Objet introuvable'
            });
        }

        await objet.destroy();

        res.status(200).json({
            message: 'Objet supprimé avec succès'
        });
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de la suppression de l objet',
            erreur: erreur.message
        });
    }
};
