const jwt = require('jsonwebtoken');
const db = require('../models/index');

async function adminMiddleware(req, res, next) {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodeToken = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

            const user = await db.User.findByPk(decodeToken.uid);
            if(user && user.roleId === 1) {
                return next();
            }

            return res.status(403).json({ message: 'You must to be an administrator to access this page.' });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    } else {
        return res.status(404).json({ message: 'Invalid token.' });
    }
}

module.exports = adminMiddleware;