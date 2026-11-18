
const { Reclamation, Utilisateur, Declaration } = require('../models');

// Afficher toutes les réclamations avec pagination
exports.afficherReclamations = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limite = parseInt(req.query.limite) || 10;
        const decalage = (page - 1) * limite;

        const resultat = await Reclamation.findAndCountAll({
            limit: limite,
            offset: decalage
        });

        res.status(200).json({
            total: resultat.count,
            page: page,
            limite: limite,
            reclamations: resultat.rows
        });
    } catch (erreur) {
        res.status(500).json({ message: erreur.message });
    }
};

// Afficher une réclamation par son identifiant
exports.afficherReclamation = async (req, res) => {
    try {
        const reclamation = await Reclamation.findByPk(req.params.id);

        if (!reclamation) {
            return res.status(404).json({
                message: 'Réclamation introuvable'
            });
        }

        res.status(200).json(reclamation);
    } catch (erreur) {
        res.status(500).json({ message: erreur.message });
    }
};

// Ajouter une réclamation
exports.ajouterReclamation = async (req, res) => {
    try {
        const { id_utilisateur, id_declaration, description, statut } = req.body;

        if (!id_utilisateur || !id_declaration) {
            return res.status(400).json({
                message: 'L utilisateur et la déclaration sont obligatoires'
            });
        }

        const utilisateur = await Utilisateur.findByPk(id_utilisateur);
        const declaration = await Declaration.findByPk(id_declaration);

        if (!utilisateur || !declaration) {
            return res.status(404).json({
                message: 'Utilisateur ou déclaration introuvable'
            });
        }

        const reclamation = await Reclamation.create({
            id_utilisateur,
            id_declaration,
            date_reclamation: new Date(),
            description,
            statut: statut || 'en attente'
        });

        res.status(201).json({
            message: 'Réclamation ajoutée avec succès',
            reclamation
        });
    } catch (erreur) {
        res.status(500).json({ message: erreur.message });
    }
};

// Modifier une réclamation
exports.modifierReclamation = async (req, res) => {
    try {
        const reclamation = await Reclamation.findByPk(req.params.id);

        if (!reclamation) {
            return res.status(404).json({
                message: 'Réclamation introuvable'
            });
        }

        const { id_utilisateur, id_declaration, description, statut } = req.body;

        if (id_utilisateur) {
            const utilisateur = await Utilisateur.findByPk(id_utilisateur);

            if (!utilisateur) {
                return res.status(404).json({
                    message: 'Utilisateur introuvable'
                });
            }
        }

        if (id_declaration) {
            const declaration = await Declaration.findByPk(id_declaration);

            if (!declaration) {
                return res.status(404).json({
                    message: 'Déclaration introuvable'
                });
            }
        }

        await reclamation.update({
            id_utilisateur,
            id_declaration,
            description,
            statut
        });

        res.status(200).json({
            message: 'Réclamation modifiée avec succès',
            reclamation
        });
    } catch (erreur) {
        res.status(500).json({ message: erreur.message });
    }
};

// Supprimer une réclamation
exports.supprimerReclamation = async (req, res) => {
    try {
        const reclamation = await Reclamation.findByPk(req.params.id);

        if (!reclamation) {
            return res.status(404).json({
                message: 'Réclamation introuvable'
            });
        }

        await reclamation.destroy();

        res.status(200).json({
            message: 'Réclamation supprimée avec succès'
        });
    } catch (erreur) {
        res.status(500).json({ message: erreur.message });
    }
};
