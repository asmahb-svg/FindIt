
const Categorie = require('../models/Categorie');

// GET - Afficher toutes les catégories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Categorie.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET - Afficher une catégorie par ID
exports.getCategorieById = async (req, res) => {
    try {
        const categorie = await Categorie.findByPk(req.params.id);

        if (!categorie) {
            return res.status(404).json({ message: 'Catégorie introuvable' });
        }

        res.status(200).json(categorie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST - Créer une catégorie
exports.createCategorie = async (req, res) => {
    try {
        const { nom, description } = req.body;

        if (typeof nom !== 'string' || !nom.trim()) {
            return res.status(400).json({ message: 'Le nom est obligatoire' });
        }

        const categorie = await Categorie.create({
            nom: nom.trim(),
            description
        });

        res.status(201).json(categorie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT - Modifier une catégorie
exports.updateCategorie = async (req, res) => {
    try {
        const categorie = await Categorie.findByPk(req.params.id);

        if (!categorie) {
            return res.status(404).json({ message: 'Catégorie introuvable' });
        }

        const { nom, description } = req.body;

        if (nom !== undefined && (typeof nom !== 'string' || !nom.trim())) {
            return res.status(400).json({ message: 'Le nom ne peut pas être vide' });
        }

        await categorie.update({
            ...(nom !== undefined && { nom: nom.trim() }),
            ...(description !== undefined && { description })
        });

        res.status(200).json(categorie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE - Supprimer une catégorie
exports.deleteCategorie = async (req, res) => {
    try {
        const categorie = await Categorie.findByPk(req.params.id);

        if (!categorie) {
            return res.status(404).json({ message: 'Catégorie introuvable' });
        }

        await categorie.destroy();

        res.status(200).json({ message: 'Catégorie supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
