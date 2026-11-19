
const { Lieu } = require('../models');

// Afficher tous les lieux
exports.afficherLieux = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limite = parseInt(req.query.limite, 10) || 10;

        if (page < 1 || limite < 1 || limite > 100) {
            return res.status(400).json({
                message: 'Les paramètres de pagination sont invalides'
            });
        }

        const resultat = await Lieu.findAndCountAll({
            limit: limite,
            offset: (page - 1) * limite,
            order: [['id_lieu', 'ASC']]
        });

        res.status(200).json({
            total: resultat.count,
            page,
            limite,
            lieux: resultat.rows
        });
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de l affichage des lieux',
            erreur: erreur.message
        });
    }
};

// Afficher un lieu par son ID
exports.afficherLieu = async (req, res) => {
    try {
        const lieu = await Lieu.findByPk(req.params.id);

        if (!lieu) {
            return res.status(404).json({
                message: 'Lieu introuvable'
            });
        }

        res.status(200).json(lieu);
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de la recherche du lieu',
            erreur: erreur.message
        });
    }
};

// Ajouter un lieu
exports.ajouterLieu = async (req, res) => {
    try {
        const { nom, adresse, ville, code_postal } = req.body;

        if (!nom || !nom.trim()) {
            return res.status(400).json({
                message: 'Le nom du lieu est obligatoire'
            });
        }

        const nouveauLieu = await Lieu.create({
            nom,
            adresse,
            ville,
            code_postal
        });

        res.status(201).json(nouveauLieu);
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de l ajout du lieu',
            erreur: erreur.message
        });
    }
};

// Modifier un lieu
exports.modifierLieu = async (req, res) => {
    try {
        const lieu = await Lieu.findByPk(req.params.id);

        if (!lieu) {
            return res.status(404).json({
                message: 'Lieu introuvable'
            });
        }

        const { nom, adresse, ville, code_postal } = req.body;

        if (nom !== undefined && !nom.trim()) {
            return res.status(400).json({
                message: 'Le nom du lieu ne peut pas être vide'
            });
        }

        await lieu.update({
            nom: nom !== undefined ? nom : lieu.nom,
            adresse: adresse !== undefined ? adresse : lieu.adresse,
            ville: ville !== undefined ? ville : lieu.ville,
            code_postal: code_postal !== undefined
                ? code_postal : lieu.code_postal
        });

        res.status(200).json(lieu);
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de la modification du lieu',
            erreur: erreur.message
        });
    }
};

// Supprimer un lieu
exports.supprimerLieu = async (req, res) => {
    try {
        const lieu = await Lieu.findByPk(req.params.id);

        if (!lieu) {
            return res.status(404).json({
                message: 'Lieu introuvable'
            });
        }

        await lieu.destroy();

        res.status(200).json({
            message: 'Lieu supprimé avec succès'
        });
    } catch (erreur) {
        res.status(500).json({
            message: 'Erreur lors de la suppression du lieu',
            erreur: erreur.message
        });
    }
};
