const ProductModel = require('../models/product');
const CategoryModel = require('../models/category');
const UserModel = require('../models/user');

class ProductService {
  async createProduct(data) {
    return await ProductModel.create(data);
  }

  async editProduct(id, data) {
    const product = await ProductModel.findByIdAndUpdate(id, data);

    return product;
  }

  async getProducts(filter = {}, page, limit) {

    const products = await ProductModel
      .find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ publicationDate: -1 });

    return products;
  }

  async getProduct(id) {
    const product = await ProductModel.findById(id);

    return product;
  }

  async approveProduct(id) {
    const product = await ProductModel.findByIdAndUpdate(id, { isApproved: true, publicationDate: new Date() });

    return product;
  }

  async deleteProduct(id, userId) {
    await UserModel.updateMany(
      {favoriteProducts: {$in:[id]}},
      {$pullAll: { favoriteProducts: [id],}}
    );


    const product = await ProductModel.findOneAndDelete({ _id: id });

    const user = await UserModel.findById(userId);

    return {
      user,
      product,
    };
  }

  async switchFavoriteProduct(userId, productId) {
    const user = await UserModel.findById(userId);

    if (user?.favoriteProducts?.includes(productId)) {
      user.favoriteProducts = user.favoriteProducts.filter(e => e !== productId);
    } else {
      user.favoriteProducts = [ ...user.favoriteProducts, productId ];
    }

    await user.save();

    return user;
  }

  async getFavoriteProducts(userId) {
    const user = await UserModel.findById(userId);

    const products = await ProductModel.find({ '_id': { $in: user?.favoriteProducts } });

    return products;
  }

  async getProductsCount(filters) {
    const count = await ProductModel.countDocuments(filters);

    return count;
  }
}

module.exports = new ProductService();
