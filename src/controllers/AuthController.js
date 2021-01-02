const User = require('../models/User');
const { passwordHash, compare, generateToken } = require('../utils/Authentacation');

const register = async (req, res) => {

    try {
        const { firstName, lastName, email, password } = req.body;

        const hashedPassword = await passwordHash(password);

        const newUser = new User({
            first_name: firstName,
            last_name: lastName,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return res.send({
            status: true,
            message: "Registrations is successful",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).send({
            status: false,
            message: "problem into server",
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email }
        });

        const comparePassword = await compare(password, user.password);

        if (comparePassword) {
            const token = await generateToken(user.id);

            return res.send({
                status: true,
                token
            });
        } else {
            return res.status(422).send({
                status: false,
                message: "password is wrong"
            });
        }

    } catch (error) {
        console.error(error);

        return res.status(500).send({
            status: false,
            message: "problem into server",
        });
    }
}

module.exports = {
    register,
    login
}