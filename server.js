const express = require('express');
const sequelize = require('./config/database');

const app = express();
const PORT = 3000;

// Lire les données JSON
app.use(express.json());

// API UTILISATEUR - Asma
app.use('/api/utilisateurs', require('./routes/utilisateurRoutes'));

// API CATEGORIE - Widad
app.use('/api/categories', require('./routes/categorieRoutes'));

// API PHOTO OBJET - Widad
app.use('/api/photos', require('./routes/photoObjetRoutes'));

// Route d'accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur l API FindIt !');
});

// Démarrer le serveur
async function demarrerServeur() {
    try {
        await sequelize.authenticate();
        console.log('Connexion à MySQL réussie !');

        app.listen(PORT, () => {
            console.log(`Serveur FindIt démarré sur le port ${PORT}`);
        });
    } catch (erreur) {
        console.log('Erreur de connexion :', erreur.message);
    }
}

demarrerServeur();