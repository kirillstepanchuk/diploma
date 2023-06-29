const productService = require('../service/product');
const userService = require('../service/user');
const fs = require('fs');

function isObjEmpty (obj) {
  return Object.keys(obj).length === 0;
}

class ProductControler {
  async createProduct(req, res, next) {
    try {
      const productData = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        additionalFields: req.body.additionalFields ? JSON.parse(req.body.additionalFields) : null,
        imageFileName: req.file.filename,
        price: req.body.price,
        sellerName: req.body.sellerName,
        sellerPhoneNumber: req.body.sellerPhoneNumber,
        requestDate: new Date(),
        author: req.user.id,
      }

      const product = await productService.createProduct(productData);

      return res.status(200).json({
        message: 'Товар успешно добавлен',
        data: {
          productId: product._id,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async editProduct(req, res, next) {
    try {
      const id = req.params.id;

      const productData = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        sellerName: req.body.sellerName,
        sellerPhoneNumber: req.body.sellerPhoneNumber,
        category: req.body.category,
        additionalFields: req.body.additionalFields ? JSON.parse(req.body.additionalFields) : null,
      }

      if (req.file) {
        productData['imageFileName'] = req.file.filename;
      }

      const product = await productService.editProduct(id, productData);
      return res.status(200).json({
        message: 'Товар успешно обновлен',
        data: {
          productId: product._id,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getProducts(req, res, next) {
    try {
      const { query } = req;

      const { page = 1, limit = 10 } = query;

      let filters = { isApproved: true, isDeleted: false }
      

      if (query.category && query.category !== "none") {
        filters['category'] = query.category
      }

      if (query.additionalFields) {
        const additionalFields = Object.entries(query.additionalFields).reduce((curr, next) => {
          if (next[1] && next[1] !== "none") {
            return {
              ...curr,
              [`additionalFields.${next[0]}`]: next[1],
            }
          }

          return curr;
        }, {})

        if (!isObjEmpty(additionalFields)) {

          filters = { ...filters, ...additionalFields}
        }
      }

      if (query.q) {
        filters['title'] = { "$regex": query.q, "$options": "i" }
      }

      if (query.min) {
        filters['price'] = {
          '$gte': query.min,
        }
      }

      if (query.max) {
        filters['price'] = {
          ...filters['price'],
          '$lte': query.max,
        }
      }

      const products = await productService.getProducts(filters, page, limit);
      const totalCount = await productService.getProductsCount(filters);

      return res.status(200).json({
        products,
        page: +page,
        totalPages: Math.ceil(totalCount / limit),
      });
    } catch (error) {
      next(error);
    }
  }

  async getAdminProducts(req, res, next) {
    try {
      const products = await productService.getProducts({ isApproved: false });

      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async getUserProducts(req, res, next) {
    try {
      const id = req.params.userId;
      const products = await productService.getProducts({ author: id });

      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async getProduct(req, res, next) {
    try {
      const id = req.params.id;
      const products = await productService.getProduct(id);

      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async approveProduct(req, res, next) {
    try {
      const id = req.params.id;
      const products = await productService.approveProduct(id);

      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const id = req.params.id;
      const userId = req.user.id;
      const data = await productService.deleteProduct(id, userId);
      console.log('product: ', data);

      if (data?.product?.imageFileName) {
        
        await fs.unlink(`${__basedir}/images/${data.product.imageFileName}`, (err) => {
          if (err) {
            console.error(err)
            return
          }
        })
      }

      return res.status(200).json(data.user);
    } catch (error) {
      next(error);
    }
  }

  async switchFavoriteProduct(req, res, next) {
    try {
      const userId = req.user.id;
      const productId = req.body.id;
      const user = await productService.switchFavoriteProduct(userId, productId);

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getFavoriteProducts(req, res, next) {
    try {
      const userId = req.user.id;
      const products = await productService.getFavoriteProducts(userId);

      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductControler();
