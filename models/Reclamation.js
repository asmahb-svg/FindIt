const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reclamation = sequelize.define('Reclamation', {
    id_reclamation: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_utilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_declaration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date_reclamation: {
        type: DataTypes.DATE
    },
    description: {
        type: DataTypes.TEXT
    },
    statut: {
        type: DataTypes.STRING(30)
    }
}, {
    tableName: 'RECLAMATION',
    timestamps: false
});

module.exports = Reclamation;