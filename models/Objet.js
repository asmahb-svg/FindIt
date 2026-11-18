const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Objet = sequelize.define('Objet', {
    id_objet: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_categorie: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    date_creation: {
        type: DataTypes.DATE
    },
    statut: {
        type: DataTypes.STRING(30)
    }
}, {
    tableName: 'OBJET',
    timestamps: false
});

module.exports = Objet;