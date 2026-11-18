
const { Utilisateur } = require('../models');
const bcrypt = require('bcrypt');

// Afficher tous les utilisateurs
exports.afficherUtilisateurs = async (req, res) => {
    try {
        const utilisateurs = await Utilisateur.findAll({
            attributes: { exclude: ['password'] }
        });

        res.status(200).json(utilisateurs);
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des utilisateurs',
            erreur: erreur.message
        });
    }
};

// Afficher un utilisateur par son ID
exports.afficherUtilisateur = async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findByPk(req.params.id, {
            attributes: { exclude: ['password'] }
        });

        if (!utilisateur) {
            return res.status(404).json({
                message: 'Utilisateur introuvable'
            });
        }

        res.status(200).json(utilisateur);
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de la récupération de l’utilisateur',
            erreur: erreur.message
        });
    }
};

// Ajouter un utilisateur
exports.ajouterUtilisateur = async (req, res) => {
    try {
        const { nom, prenom, email, password, telephone } = req.body;

        if (!nom || !prenom || !email || !password || !telephone) {
            return res.status(400).json({
                message: 'Tous les champs sont obligatoires'
            });
        }

        const utilisateurExistant = await Utilisateur.findOne({
            where: { email }
        });

        if (utilisateurExistant) {
            return res.status(409).json({
                message: 'Cette adresse e-mail est déjà utilisée'
            });
        }

        const motDePasseHache = await bcrypt.hash(password, 10);

        const nouvelUtilisateur = await Utilisateur.create({
            nom,
            prenom,
            email,
            password: motDePasseHache,
            telephone
        });

        res.status(201).json({
            message: 'Utilisateur ajouté avec succès',
            utilisateur: {
                id_utilisateur: nouvelUtilisateur.id_utilisateur,
                nom: nouvelUtilisateur.nom,
                prenom: nouvelUtilisateur.prenom,
                email: nouvelUtilisateur.email,
                telephone: nouvelUtilisateur.telephone
            }
        });
    } catch (erreur) {
        console.log('ERREUR AJOUT UTILISATEUR :', erreur);

        if (erreur.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                message: 'Cette adresse e-mail est déjà utilisée'
            });
        }

        res.status(500).json({
            message: 'Erreur lors de l’ajout de l’utilisateur',
            erreur: erreur.message,
            details: erreur.errors
                ? erreur.errors.map(e => ({
                    champ: e.path,
                    message: e.message
                }))
                : []
        });
    }
};

// Modifier un utilisateur
exports.modifierUtilisateur = async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findByPk(req.params.id);

        if (!utilisateur) {
            return res.status(404).json({
                message: 'Utilisateur introuvable'
            });
        }

        const { nom, prenom, email, password, telephone } = req.body;

        if (email && email !== utilisateur.email) {
            const utilisateurExistant = await Utilisateur.findOne({
                where: { email }
            });

            if (utilisateurExistant) {
                return res.status(409).json({
                    message: 'Cette adresse e-mail est déjà utilisée'
                });
            }
        }

        const donneesModifiees = {};

        if (nom !== undefined) donneesModifiees.nom = nom;
        if (prenom !== undefined) donneesModifiees.prenom = prenom;
        if (email !== undefined) donneesModifiees.email = email;
        if (telephone !== undefined) donneesModifiees.telephone = telephone;

        if (password) {
            donneesModifiees.password = await bcrypt.hash(password, 10);
        }

        await utilisateur.update(donneesModifiees);

        res.status(200).json({
            message: 'Utilisateur modifié avec succès'
        });
    } catch (erreur) {
        if (erreur.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                message: 'Cette adresse e-mail est déjà utilisée'
            });
        }

        res.status(500).json({
            message: 'Erreur lors de la modification de l’utilisateur',
            erreur: erreur.message
        });
    }
};

// Supprimer un utilisateur
exports.supprimerUtilisateur = async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findByPk(req.params.id);

        if (!utilisateur) {
            return res.status(404).json({
                message: 'Utilisateur introuvable'
            });
        }

        await utilisateur.destroy();

        res.status(200).json({
            message: 'Utilisateur supprimé avec succès'
        });
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de la suppression de l’utilisateur',
            erreur: erreur.message
        });
    }
};
