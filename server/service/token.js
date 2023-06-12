const jwt = require('jsonwebtoken');

const TokenModel = require('../models/token');
const { accessSecret, refreshSecret } = require('../config');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessSecret, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken,
    }
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, accessSecret);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, refreshSecret);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await TokenModel.create({ user: userId, refreshToken });

    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await TokenModel.deleteOne({refreshToken})
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await TokenModel.findOne({refreshToken})
    return tokenData;
  }
}

module.exports = new TokenService();
