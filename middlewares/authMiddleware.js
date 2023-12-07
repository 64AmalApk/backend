// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const config = require('../config');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Access denied. Token is required.');
    }

    jwt.verify(token, config.secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token.');
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;
