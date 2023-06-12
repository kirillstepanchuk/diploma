const userService = require('../service/user');

class UserControler {
  async switchBlockUser(req, res, next) {
    try {
      const { id, block } = req.body;
      const products = await userService.switchBlockUser(id, block);

      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async updateUserRoles(req, res, next) {
    try {
      const { roles, id } = req.body;
      const user = await userService.updateUserRoles(id, roles);

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getAdminUsers(req, res, next) {
    try {
      const products = await userService.getUsers({ _id: { $ne: req.user.id } });

      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async updateUserInfo(req, res, next) {
    try {
      const userData = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
      }

      const user = await userService.updateUser(req.user.id, userData);

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserControler();
