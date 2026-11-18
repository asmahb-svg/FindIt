const sequelize = require('./config/database');
require('./models');

async function testerModeles() {
    try {
        await sequelize.authenticate();
        console.log('Connexion à MySQL réussie !');

        await sequelize.sync();

        console.log('Les tables ont été créées avec succès !');
    } catch (erreur) {
        console.log('Erreur :', erreur.message);
    } finally {
        await sequelize.close();
    }
}

testerModeles();