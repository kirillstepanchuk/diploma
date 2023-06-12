const jwt = require('jsonwebtoken')
const {secret} = require('../config');
const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token');

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization?.split(' ')[1]
        console.log('token: ', token);
        if (!token) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = tokenService.validateAccessToken(token)
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }
        req.user = userData
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError());
        // return res.status(403).json({message: "Пользователь не авторизован"})
    }
};