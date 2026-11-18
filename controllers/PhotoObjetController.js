const { PhotoObjet, Objet } = require('../models');

// Afficher toutes les photos
exports.afficherPhotos = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limite = parseInt(req.query.limite, 10) || 10;

        if (page < 1 || limite < 1 || limite > 100) {
            return res.status(400).json({
                message: 'Les paramètres de pagination sont invalides'
            });
        }

        const resultat = await PhotoObjet.findAndCountAll({
            limit: limite,
            offset: (page - 1) * limite,
            order: [['id_photo', 'ASC']]
        });

        res.status(200).json({
            total: resultat.count,
            page,
            limite,
            photos: resultat.rows
        });
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de l affichage des photos',
            erreur: erreur.message
        });
    }
};

// Afficher une photo par son ID
exports.afficherPhoto = async (req, res) => {
    try {
        const photo = await PhotoObjet.findByPk(req.params.id);

        if (!photo) {
            return res.status(404).json({
                message: 'Photo introuvable'
            });
        }

        res.status(200).json(photo);
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de la recherche de la photo',
            erreur: erreur.message
        });
    }
};

// Ajouter une photo
exports.ajouterPhoto = async (req, res) => {
    try {
        const {
            id_objet,
            chemin_fichier,
            date_ajout
        } = req.body;

        if (!id_objet || !chemin_fichier || !chemin_fichier.trim()) {
            return res.status(400).json({
                message: 'L objet et le chemin du fichier sont obligatoires'
            });
        }

        const objet = await Objet.findByPk(id_objet);

        if (!objet) {
            return res.status(404).json({
                message: 'Objet introuvable'
            });
        }

        const nouvellePhoto = await PhotoObjet.create({
            id_objet,
            chemin_fichier,
            date_ajout
        });

        res.status(201).json(nouvellePhoto);
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de l ajout de la photo',
            erreur: erreur.message
        });
    }
};

// Modifier une photo
exports.modifierPhoto = async (req, res) => {
    try {
        const photo = await PhotoObjet.findByPk(req.params.id);

        if (!photo) {
            return res.status(404).json({
                message: 'Photo introuvable'
            });
        }

        const {
            id_objet,
            chemin_fichier,
            date_ajout
        } = req.body;

        if (id_objet !== undefined) {
            const objet = await Objet.findByPk(id_objet);

            if (!objet) {
                return res.status(404).json({
                    message: 'Objet introuvable'
                });
            }
        }

        if (chemin_fichier !== undefined && !chemin_fichier.trim()) {
            return res.status(400).json({
                message: 'Le chemin du fichier ne peut pas être vide'
            });
        }

        await photo.update({
            id_objet: id_objet !== undefined
                ? id_objet : photo.id_objet,
            chemin_fichier: chemin_fichier !== undefined
                ? chemin_fichier : photo.chemin_fichier,
            date_ajout: date_ajout !== undefined
                ? date_ajout : photo.date_ajout
        });

        res.status(200).json(photo);
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de la modification de la photo',
            erreur: erreur.message
        });
    }
};

// Supprimer une photo
exports.supprimerPhoto = async (req, res) => {
    try {
        const photo = await PhotoObjet.findByPk(req.params.id);

        if (!photo) {
            return res.status(404).json({
                message: 'Photo introuvable'
            });
        }

        await photo.destroy();

        res.status(200).json({
            message: 'Photo supprimée avec succès'
        });
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de la suppression de la photo',
            erreur: erreur.message
        });
    }
};