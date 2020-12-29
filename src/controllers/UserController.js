const User = require('../models/User');

const getAll = async (req, res) => {

    try {
        const data = await User.findAll();

        return res.send({
            status: true,
            message: "success get data",
            data: data
        });
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            status: false,
            message: "problem into server",
        });
    }
}

const getOne = async (req, res) => {

    try {
        const { id } = req.params;

        const user = await User.findOne({
            where: { id }
        });

        if (user) {
            return res.send({
                status: true,
                message: `success get data with id: ${id}`,
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
    getAll,
    getOne
}