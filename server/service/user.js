const uuid = require('uuid');
const bcrypt = require('bcryptjs');

const UserModel = require('../models/user');
const RoleModel = require('../models/role');
const mailService = require('./mail');
const tokenService = require('./token');
const UserDto = require('../dtos/user');
const ApiError = require('../exceptions/api-error');

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
    }
    const hashedPassword = bcrypt.hashSync(password, 7);
    const userRole = await RoleModel.findOne({ value: 'USER' });
    const activationLink = uuid.v4();

    const user = await UserModel.create({ email, password: hashedPassword, roles: [ userRole.value ], activationLink});

    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    }
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    console.log('user: ', user);
    if (!user) {
      throw ApiError.BadRequest('Некорректная ссылка активации');
    }

    user.isActivated = true;
    user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({email})
    if (!user) {
        throw ApiError.BadRequest('Пользователь с таким email не найден')
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
        throw ApiError.BadRequest('Неверный пароль');
    }
    if (!user.isActivated) {
      throw ApiError.BadRequest(`Для входа вам требуется подтвердить почту (проверьте почту ${user.email})`);
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto}
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
        throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
        throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto}
  }

  async switchBlockUser(id, isBlocked) {
    const user = await UserModel.findByIdAndUpdate(id, { isBlocked });

    return user;
  }

  async getUserById(id) {
    const user = await UserModel.findById(id);

    return user;
  }

  async getUsers(filter = {}) {
    const users = await UserModel.find(filter);

    return users;
  }

  async updateUserRoles(id, roles) {
    const user = await UserModel.findByIdAndUpdate(id, { roles });

    return user;
  }

  async updateUser(id, data) {
    const user = await UserModel.findByIdAndUpdate(id, data);

    return user;
  }
}

module.exports = new UserService();
