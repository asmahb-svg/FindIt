const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lieu = sequelize.define('Lieu', {
    id_lieu: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    adresse: {
        type: DataTypes.STRING(255)
    },
    ville: {
        type: DataTypes.STRING(100)
    },
    code_postal: {
        type: DataTypes.STRING(20)
    }
}, {
    tableName: 'LIEU',
    timestamps: false
});

module.exports = Lieu;