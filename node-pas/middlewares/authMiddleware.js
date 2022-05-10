const jwt = require('jsonwebtoken');
const db = require('../models/index');

async function authMiddleware(req, res, next) {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodeToken = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

            const user = await db.User.findByPk(decodeToken.uid);
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            req.user = user;
            return next();

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
        
    }
    res.status(403).json({message: 'You must to be logged in to access this page.'});
    next();
}

module.exports = authMiddleware;