const sequelize = require('./config/database');

async function testerConnexion() {
    try {
        await sequelize.authenticate();
        console.log('Connexion à MySQL réussie !');
    } catch (erreur) {
        console.log('Erreur de connexion :', erreur.message);
    }
}

testerConnexion();