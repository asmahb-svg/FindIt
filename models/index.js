const Utilisateur = require('./Utilisateur');
const Role = require('./Role');
const Categorie = require('./Categorie');
const Objet = require('./Objet');
const Lieu = require('./Lieu');
const Declaration = require('./Declaration');
const Reclamation = require('./Reclamation');
const PhotoObjet = require('./PhotoObjet');
const UtilisateurRole = require('./UtilisateurRole');

// Relations entre UTILISATEUR et ROLE
Utilisateur.belongsToMany(Role, {
    through: UtilisateurRole,
    foreignKey: 'id_utilisateur',
    otherKey: 'id_role'
});

Role.belongsToMany(Utilisateur, {
    through: UtilisateurRole,
    foreignKey: 'id_role',
    otherKey: 'id_utilisateur'
});

// Relations entre UTILISATEUR et DECLARATION
Utilisateur.hasMany(Declaration, {
    foreignKey: 'id_utilisateur'
});

Declaration.belongsTo(Utilisateur, {
    foreignKey: 'id_utilisateur'
});

// Relations entre UTILISATEUR et RECLAMATION
Utilisateur.hasMany(Reclamation, {
    foreignKey: 'id_utilisateur'
});

Reclamation.belongsTo(Utilisateur, {
    foreignKey: 'id_utilisateur'
});

// Relations entre CATEGORIE et OBJET
Categorie.hasMany(Objet, {
    foreignKey: 'id_categorie'
});

Objet.belongsTo(Categorie, {
    foreignKey: 'id_categorie'
});

// Relations entre OBJET et DECLARATION
Objet.hasMany(Declaration, {
    foreignKey: 'id_objet'
});

Declaration.belongsTo(Objet, {
    foreignKey: 'id_objet'
});

// Relations entre LIEU et DECLARATION
Lieu.hasMany(Declaration, {
    foreignKey: 'id_lieu'
});

Declaration.belongsTo(Lieu, {
    foreignKey: 'id_lieu'
});

// Relations entre OBJET et PHOTO_OBJET
Objet.hasMany(PhotoObjet, {
    foreignKey: 'id_objet'
});

PhotoObjet.belongsTo(Objet, {
    foreignKey: 'id_objet'
});

// Relations entre DECLARATION et RECLAMATION
Declaration.hasMany(Reclamation, {
    foreignKey: 'id_declaration'
});

Reclamation.belongsTo(Declaration, {
    foreignKey: 'id_declaration'
});

module.exports = {
    Utilisateur,
    Role,
    Categorie,
    Objet,
    Lieu,
    Declaration,
    Reclamation,
    PhotoObjet,
    UtilisateurRole
};