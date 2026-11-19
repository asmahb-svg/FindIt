
const jwt = require('jsonwebtoken');

const verifierToken = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Accès refusé. Token manquant.'
            });
        }

        const token = authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.utilisateur = decoded;

        next();

    } catch (erreur) {
        return res.status(401).json({
            message: 'Token invalide ou expiré'
        });
    }
};

module.exports = verifierToken;
