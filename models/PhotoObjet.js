const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PhotoObjet = sequelize.define('PhotoObjet', {
    id_photo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_objet: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    chemin_fichier: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    date_ajout: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'PHOTO_OBJET',
    timestamps: false
});

module.exports = PhotoObjet;
