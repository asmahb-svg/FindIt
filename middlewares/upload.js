const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Dossier où les images seront enregistrées
const dossierUploads = 'uploads';

// Créer le dossier s'il n'existe pas encore
if (!fs.existsSync(dossierUploads)) {
    fs.mkdirSync(dossierUploads, { recursive: true });
}

// Où enregistrer l'image et sous quel nom
const stockage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dossierUploads);
    },
    filename: (req, file, cb) => {
        const nomUnique = Date.now() + path.extname(file.originalname);
        cb(null, nomUnique);
    }
});

// Accepter seulement les images
const filtreImages = (req, file, cb) => {
    const typesAcceptes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (typesAcceptes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Seules les images (jpg, png, gif, webp) sont acceptées'));
    }
};

const upload = multer({
    storage: stockage,
    fileFilter: filtreImages,
    limits: { fileSize: 5 * 1024 * 1024 } // 5 Mo maximum
});

// Recevoir une seule image (champ "image") et gérer les erreurs
exports.uploadImage = (req, res, next) => {
    upload.single('image')(req, res, (erreur) => {
        if (erreur) {
            return res.status(400).json({
                message: 'Erreur lors de l envoi de l image',
                erreur: erreur.message
            });
        }

        // Mettre le chemin de l'image dans req.body pour le contrôleur
        if (req.file) {
            req.body.chemin_fichier = 'uploads/' + req.file.filename;
        }

        next();
    });
};