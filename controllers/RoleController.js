
const { Role } = require('../models');

// Afficher tous les rôles
exports.afficherRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();

        res.status(200).json(roles);
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de l affichage des rôles',
            erreur: erreur.message
        });
    }
};

// Afficher un rôle par son ID
exports.afficherRole = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);

        if (!role) {
            return res.status(404).json({
                message: 'Rôle introuvable'
            });
        }

        res.status(200).json(role);
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de la recherche du rôle',
            erreur: erreur.message
        });
    }
};

// Ajouter un rôle
exports.ajouterRole = async (req, res) => {
    try {
        const { titre, description } = req.body;

        if (!titre) {
            return res.status(400).json({
                message: 'Le titre est obligatoire'
            });
        }

        const roleExistant = await Role.findOne({
            where: { titre }
        });

        if (roleExistant) {
            return res.status(409).json({
                message: 'Ce rôle existe déjà'
            });
        }

        const nouveauRole = await Role.create({
            titre,
            description
        });

        res.status(201).json(nouveauRole);
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de l ajout du rôle',
            erreur: erreur.message
        });
    }
};

// Modifier un rôle
exports.modifierRole = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);

        if (!role) {
            return res.status(404).json({
                message: 'Rôle introuvable'
            });
        }

        const { titre, description } = req.body;

        if (titre !== undefined && titre !== role.titre) {
            const roleExistant = await Role.findOne({
                where: { titre }
            });

            if (roleExistant) {
                return res.status(409).json({
                    message: 'Ce titre est déjà utilisé'
                });
            }
        }

        await role.update({
            titre: titre !== undefined ? titre : role.titre,
            description: description !== undefined
                ? description
                : role.description
        });

        res.status(200).json(role);
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de la modification du rôle',
            erreur: erreur.message
        });
    }
};

// Supprimer un rôle
exports.supprimerRole = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);

        if (!role) {
            return res.status(404).json({
                message: 'Rôle introuvable'
            });
        }

        await role.destroy();

        res.status(200).json({
            message: 'Rôle supprimé avec succès'
        });
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de la suppression du rôle',
            erreur: erreur.message
        });
    }
};
