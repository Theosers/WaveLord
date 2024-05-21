const jwt = require('jsonwebtoken');
module.exports.authMiddleware = async (req, res, next) => {
    const { accessToken } = req.cookies;
    if (!accessToken) {
        return res.status(401).json({ error: 'You are not logged yet' });
    } else {
        try {
            const decodeToken = await jwt.verify(accessToken, process.env.SECRET_KEY);
            req.role = decodeToken.role;
            req.id = decodeToken.id;
            next();
        } catch (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }
    
}