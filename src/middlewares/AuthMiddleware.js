const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.send({
            status: false,
            message: "token not exists"
        });
    }

    const secretKey = process.env.SECRET_KEY || 'secretKeyToken';
    const token = req.headers.authorization.split(" ")[1];

    try {
        const credential = jwt.verify(token, secretKey);

        if (credential) {
            req.app.locals.credential = credential;
            return next();
        }

        return res.send({
            status: false,
            message: "invalid token"
        });
    } catch (error) {
        const decode = jwt.decode(token);

        if (!decode) {
            return res.send({
                status: false,
                message: error.message
            });
        }

        if (decode.exp < Date.now() / 1000) {
            return res.status(401).send({
                status: false,
                message: "token expired"
            });
        }
    }
}

module.exports = {
    auth
}