
const { UtilisateurRole, Role } = require('../models');

const autoriserRole = (...rolesAutorises) => {
    return async (req, res, next) => {
        try {
            if (!req.utilisateur || !req.utilisateur.id_utilisateur) {
                return res.status(401).json({
                    message: 'Utilisateur non authentifié'
                });
            }

            const relations = await UtilisateurRole.findAll({
                where: {
                    id_utilisateur: req.utilisateur.id_utilisateur
                }
            });

            const idsRoles = relations.map(
                relation => relation.id_role
            );

            const rolesUtilisateur = await Role.findAll({
                where: {
                    id_role: idsRoles
                }
            });

            const titresRoles = rolesUtilisateur.map(
                role => role.titre
            );

            const autorise = rolesAutorises.some(
                role => titresRoles.includes(role)
            );

            if (!autorise) {
                return res.status(403).json({
                    message: 'Accès interdit : permissions insuffisantes'
                });
            }

            next();

        } catch (erreur) {
            res.status(500).json({
                message: 'Erreur lors de la vérification du rôle',
                erreur: erreur.message
            });
        }
    };
};

module.exports = autoriserRole;
