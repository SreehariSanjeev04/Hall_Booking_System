const jwt = require('jsonwebtoken');

exports.validateAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ success: false, message: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Invalid token. Please login again.' });
        }
        if (decoded.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
        }
        req.user = decoded;
        next();
    });
};

exports.validateUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ success: false, message: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Invalid token. Please login again.' });
        }
        if (decoded.role === 'admin' || decoded.role === 'user') {
            req.user = decoded;
            next();
        } else {
            return res.status(403).json({ success: false, message: 'Access denied.' });
        }
        
    });
};
