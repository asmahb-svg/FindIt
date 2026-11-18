const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Declaration = sequelize.define('Declaration', {
    id_declaration: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_utilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_objet: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_lieu: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type_declaration: {
        type: DataTypes.ENUM('perdu', 'trouve'),
        allowNull: false
    },
    date_declaration: {
        type: DataTypes.DATE
    },
    description: {
        type: DataTypes.TEXT
    },
    statut: {
        type: DataTypes.STRING(30)
    }
}, {
    tableName: 'DECLARATION',
    timestamps: false
});

module.exports = Declaration;