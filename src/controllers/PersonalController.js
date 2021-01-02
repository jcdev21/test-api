const User = require('../models/User');

const getMyAccount = async (req, res) => {

    try {
        const { id } = req.app.locals.credential;

        const user = await User.findOne({
            where: { id },
            attributes: ['id', 'email', 'first_name', 'last_name']
        });

        if (user) {
            return res.send({
                status: true,
                message: `success get data account`,
                data: user
            });
        }

        return res.send({
            status: false,
            message: `with id: ${id} not exists`,
            data: user
        });
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            status: false,
            message: "problem into server",
        });
    }
}

module.exports = {
    getMyAccount
}