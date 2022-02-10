const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)

    const token = authHeader.split(' ')[1]
   
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.status(401).json({
                message: 'Invalid token'
            });
        } else {
            req.user = user;
            console.log(req.user)
            next();
        }
    });
    
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyJWT(req, res, () => {
        console.log(req.user.id)
        console.log(req.params.id)
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json({
                message: 'Forbidden'
            });
        }
    });

}

module.exports = {verifyTokenAndAuthorization};