const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const validateRegister = [
    check('firstName')
        .exists().withMessage('first name is required')
        .notEmpty().withMessage('first name is not empty')
        .trim().escape(),
    check('lastName')
        .exists().withMessage('last name is required')
        .notEmpty().withMessage('last name is not empty')
        .trim().escape(),
    check('email')
        .exists().withMessage('email is required')
        .notEmpty().withMessage('email is not empty')
        .isEmail().withMessage('email not valid')
        .trim().escape()
        .custom( async (value) => {
            return await User.findOne({
                where: { email: value }
            }).then((user) => {
                if (user) {
                    return Promise.reject('email already in use');
                }
            });
        }),
    check('password')
        .exists().withMessage('password is required')
        .notEmpty().withMessage('password is not empty')
        .trim().escape()
        .isLength({ min: 6 }).withMessage('password minimal 6 caracther')
        .custom((value, { req }) => {
            return (value === req.body.confirmPassword) ? true : false;
        }).withMessage('password and confirm password not match'),
    check('confirmPassword')
        .exists().withMessage('confirm password is required')
        .notEmpty().withMessage('confirm password is not empty')
        .trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).send({
                status: false,
                errors: errors.array()
            });
        }

        return next();
    }
];

const validateLogin = [
    check('email')
        .exists().withMessage('email is required')
        .notEmpty().withMessage('email is not empty')
        .isEmail().withMessage('email not valid')
        .trim().escape()
        .custom( async (value) => {
            return await User.findOne({
                where: { email: value }
            }).then((user) => {
                if (!user) {
                    return Promise.reject('email not registered');
                }
            });
        }),
    check('password')
        .exists().withMessage('password is required')
        .notEmpty().withMessage('password is not empty')
        .trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).send({
                status: false,
                errors: errors.array()
            });
        }

        return next();
    }
];

module.exports = {
    validateRegister,
    validateLogin
}