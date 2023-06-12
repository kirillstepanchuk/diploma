const categoryService = require('../service/category');
const { v4: uuidv4 } = require('uuid');

class CategoryControler {
  async getCategories(req, res, next) {
    try {
      const categories = await categoryService.getCategories()
      return res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req, res, next) {
    try {
      const data = {
        name: req.body.name,
        sysname: uuidv4(),
        fields: []
      }

      const category = await categoryService.createCategory(data)
      return res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const id = req.params.id;
      const data = req.body;

      const category = await categoryService.updateCategory(id, data);

      return res.status(200).json(category)

    } catch (error) {
      next(error);
    }
  }

  async addCategorySetting(req, res, next) {
    try {
      const id = req.params.id;
      const data = req.body;

      const category = await categoryService.addCategorySetting(id, data);

      return res.status(200).json(category)
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const id = req.params.id;

      const category = await categoryService.deleteCategory(id);

      return res.status(200).json(category)
    } catch (error) {
      next(error);
    }
  }

  async deleteCategoryField(req, res, next) {
    try {
      const id = req.params.id;
      const field = req.body;

      const category = await categoryService.deleteCategoryField(id, field);

      return res.status(200).json(category)
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryControler();
