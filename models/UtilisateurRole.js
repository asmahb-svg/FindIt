const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UtilisateurRole = sequelize.define('UtilisateurRole', {
    id_utilisateur_role: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_utilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_role: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'UTILISATEUR_ROLE',
    timestamps: false
});

module.exports = UtilisateurRole;