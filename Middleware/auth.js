const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.JWT_secret);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next(); 
    }
    catch (error) {
        res.status(401).json({ error: 'Requête non authentifiée !' });
    }
};