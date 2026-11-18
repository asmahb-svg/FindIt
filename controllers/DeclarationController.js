
const {
    Declaration,
    Utilisateur,
    Objet,
    Lieu
} = require('../models');

// Afficher toutes les déclarations
exports.afficherDeclarations = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limite = parseInt(req.query.limite, 10) || 10;

        if (page < 1 || limite < 1 || limite > 100) {
            return res.status(400).json({
                message: 'Les paramètres de pagination sont invalides'
            });
        }

        const resultat = await Declaration.findAndCountAll({
            limit: limite,
            offset: (page - 1) * limite,
            order: [['id_declaration', 'ASC']]
        });

        res.status(200).json({
            total: resultat.count,
            page,
            limite,
            declarations: resultat.rows
        });
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de l affichage des déclarations',
            erreur: erreur.message
        });
    }
};

// Afficher une déclaration par son ID
exports.afficherDeclaration = async (req, res) => {
    try {
        const declaration = await Declaration.findByPk(req.params.id);

        if (!declaration) {
            return res.status(404).json({
                message: 'Déclaration introuvable'
            });
        }

        res.status(200).json(declaration);
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de la recherche de la déclaration',
            erreur: erreur.message
        });
    }
};

// Ajouter une déclaration
exports.ajouterDeclaration = async (req, res) => {
    try {
        const {
            id_utilisateur,
            id_objet,
            id_lieu,
            type_declaration,
            date_declaration,
            description,
            statut
        } = req.body;

        if (
            !id_utilisateur ||
            !id_objet ||
            !id_lieu ||
            !type_declaration
        ) {
            return res.status(400).json({
                message: 'Les champs utilisateur, objet, lieu et type sont obligatoires'
            });
        }

        if (!['perdu', 'trouve'].includes(type_declaration)) {
            return res.status(400).json({
                message: 'Le type doit être perdu ou trouve'
            });
        }

        const utilisateur = await Utilisateur.findByPk(id_utilisateur);
        const objet = await Objet.findByPk(id_objet);
        const lieu = await Lieu.findByPk(id_lieu);

        if (!utilisateur || !objet || !lieu) {
            return res.status(404).json({
                message: 'Utilisateur, objet ou lieu introuvable'
            });
        }

        const nouvelleDeclaration = await Declaration.create({
            id_utilisateur,
            id_objet,
            id_lieu,
            type_declaration,
            date_declaration,
            description,
            statut
        });

        res.status(201).json(nouvelleDeclaration);
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de l ajout de la déclaration',
            erreur: erreur.message
        });
    }
};

// Modifier une déclaration
exports.modifierDeclaration = async (req, res) => {
    try {
        const declaration = await Declaration.findByPk(req.params.id);

        if (!declaration) {
            return res.status(404).json({
                message: 'Déclaration introuvable'
            });
        }

        const {
            id_utilisateur,
            id_objet,
            id_lieu,
            type_declaration,
            date_declaration,
            description,
            statut
        } = req.body;

        if (
            type_declaration !== undefined &&
            !['perdu', 'trouve'].includes(type_declaration)
        ) {
            return res.status(400).json({
                message: 'Le type doit être perdu ou trouve'
            });
        }

        if (id_utilisateur !== undefined) {
            const utilisateur = await Utilisateur.findByPk(id_utilisateur);

            if (!utilisateur) {
                return res.status(404).json({
                    message: 'Utilisateur introuvable'
                });
            }
        }

        if (id_objet !== undefined) {
            const objet = await Objet.findByPk(id_objet);

            if (!objet) {
                return res.status(404).json({
                    message: 'Objet introuvable'
                });
            }
        }

        if (id_lieu !== undefined) {
            const lieu = await Lieu.findByPk(id_lieu);

            if (!lieu) {
                return res.status(404).json({
                    message: 'Lieu introuvable'
                });
            }
        }

        await declaration.update({
            id_utilisateur: id_utilisateur !== undefined
                ? id_utilisateur : declaration.id_utilisateur,
            id_objet: id_objet !== undefined
                ? id_objet : declaration.id_objet,
            id_lieu: id_lieu !== undefined
                ? id_lieu : declaration.id_lieu,
            type_declaration: type_declaration !== undefined
                ? type_declaration : declaration.type_declaration,
            date_declaration: date_declaration !== undefined
                ? date_declaration : declaration.date_declaration,
            description: description !== undefined
                ? description : declaration.description,
            statut: statut !== undefined
                ? statut : declaration.statut
        });

        res.status(200).json(declaration);
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de la modification de la déclaration',
            erreur: erreur.message
        });
    }
};

// Supprimer une déclaration
exports.supprimerDeclaration = async (req, res) => {
    try {
        const declaration = await Declaration.findByPk(req.params.id);

        if (!declaration) {
            return res.status(404).json({
                message: 'Déclaration introuvable'
            });
        }

        await declaration.destroy();

        res.status(200).json({
            message: 'Déclaration supprimée avec succès'
        });
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de la suppression de la déclaration',
            erreur: erreur.message
        });
    }
};
