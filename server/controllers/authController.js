const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Role = require('../models/role');
const userService = require('../service/user');
const { accessSecret } = require('../config');
const ApiError = require('../exceptions/api-error');

const generateAccessToken = (id, roles) => {
  const payload = { id, roles };
  return jwt.sign(payload, accessSecret, { expiresIn: '24h' });
}

class AuthController {
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка валидации', errors.array()))
      }

      const { email, password } = req.body;

      const userData = await userService.registration(email, password)

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true });

      return res.status(200).json({
        user: userData,
        message: 'Пользователь успешно зарегистрирован.',
      });

    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const userData = await userService.login(email, password);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true });

      return res.status(200).json(userData)
    } catch (error) {
      next(error);

    }
  }

  async logout(req, res) {
    try {
      const {refreshToken} = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
  } catch (e) {
      next(e);
  }
  }

  async activateEmail(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(`${process.env.CLIENT_URL}/login`);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const data = await User.find();
      res.json(data)
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
