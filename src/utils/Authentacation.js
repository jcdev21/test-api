const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const passwordHash = async (password) => {
    return await bcrypt.hash(password, 10);
}

const compare = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
}

const generateToken = (id) => {
    const secretKey = process.env.SECRET_KEY || 'secretKeyToken';

    const token = jwt.sign({ id }, secretKey, { expiresIn: '60m' });

    return token;
}

module.exports = {
    passwordHash,
    compare,
    generateToken
}