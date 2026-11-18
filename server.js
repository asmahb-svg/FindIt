const express = require('express');
const sequelize = require('./config/database');

const app = express();
const PORT = 3000;

// Lire les données JSON envoyées par les utilisateurs
app.use(express.json());

// Routes des utilisateurs
app.use('/api/utilisateurs', require('./routes/utilisateurRoutes'));

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