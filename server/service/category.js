const CategoryModel = require('../models/category');

class CategoryService {
  async getCategories() {
    // CategoryModel.create({
    //   name: "Легковые авто",
    //   sysname: "light-autos",
    //   fields: [
    //     {
    //       sysname: "brand",
    //       type: "select",
    //       name: "Марка",
    //       values: [{
    //         value: "volvo",
    //         name: "volvo",
    //       },
    //       {
    //         value: "audi",
    //         name: "audi",
    //       },
    //       {
    //         value: "porsche",
    //         name: "porsche",
    //       }
    //     ],
    //     },
    //     {
    //       sysname: "body-type",
    //       type: "select",
    //       name: "Тип кузова",
    //       values: [{
    //         value: "sedan",
    //         name: "Седан",
    //       },
    //       {
    //         value: "universal",
    //         name: "Универсал",
    //       },
    //       {
    //         value: "coupe",
    //         name: "Купе",
    //       }
    //     ],
    //     }
    //   ]
    // });

    const categories = await CategoryModel.find();

    return categories;
  }

  async createCategory(data) {
    const category = await CategoryModel.create(data);

    return category;
  }

  async updateCategory(id, data) {
    const category = await CategoryModel.findByIdAndUpdate(id, data);

    return category;
  }

  async addCategorySetting(id, data) {
    const category = await CategoryModel.findById(id);

    category.fields.push(data);

    await category.save()

    return category;
  }

  async deleteCategory(id) {
    const category = await CategoryModel.deleteOne({_id: id});

    return category;
  }

  async deleteCategoryField(id, field) {
    const category = await CategoryModel.findById(id);

    category.fields = category.fields.filter((cField) => cField.sysname !== field.sysname);

    await category.save();

    return category;
  }
}

module.exports = new CategoryService();
