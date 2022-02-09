const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)
   
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({
                message: 'Invalid token'
            });
        } else {
            req.user = decoded;
            next();
        }
    });
    
}

module.exports = verifyJWT;