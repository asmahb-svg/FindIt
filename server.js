
const express = require('express');
const sequelize = require('./config/database');

const utilisateurRoutes = require('./routes/utilisateurRoutes');
const roleRoutes = require('./routes/roleRoutes');
const declarationRoutes = require('./routes/declarationRoutes');
const objetRoutes = require('./routes/objetRoutes');
const lieuRoutes = require('./routes/lieuRoutes');
const reclamationRoutes = require('./routes/reclamationRoutes');
const categorieRoutes = require('./routes/categorieRoutes');

const app = express();
const PORT = 3001;

// Lire les données JSON
app.use(express.json());

// Routes API
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/declarations', declarationRoutes);
app.use('/api/objets', objetRoutes);
app.use('/api/lieux', lieuRoutes);
app.use('/api/reclamations', reclamationRoutes);
app.use('/api/categories', categorieRoutes);

// Route d'accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur l API FindIt !');
});

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
