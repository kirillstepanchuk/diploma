const express = require('express');
const {check, body} = require("express-validator")

const User = require('../models/user');
const Role = require('../models/role');
const controller = require('../controllers/authController');
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/rolesMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');


const router = express.Router();

// Registration
router.post(
  '/register',
  // check('username', 'Имя пользователя не может быть пустым.').notEmpty(),
  body('email').isEmail(),
  check('password', 'Пароль должен быть длиной от 4 до 10 символов.').isLength({ min: 4, max: 10 }),
  controller.register,
);
// Login
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.get('/activate/:link', controller.activateEmail);
router.get('/refresh', controller.refresh);

router.post('/switch-block-user', authMiddleware, userController.switchBlockUser);
router.post('/update-user-roles', authMiddleware, userController.updateUserRoles);

// Get users
router.get('/users', authMiddleware, userController.getAdminUsers);

// Items
router.post('/add-product', authMiddleware, uploadMiddleware.single('image'), productController.createProduct);
router.put('/product/:id', authMiddleware, uploadMiddleware.single('image'), productController.editProduct);
router.get('/products', productController.getProducts);
router.get('/product/:id', productController.getProduct);

router.get('/user-products/:userId', productController.getUserProducts);
router.put('/profile', authMiddleware, userController.updateUserInfo);

router.get('/admin/products', productController.getAdminProducts);
router.post('/approve-product/:id', productController.approveProduct);
router.delete('/product/:id', authMiddleware, productController.deleteProduct);

router.post('/switch-favorite-product', authMiddleware, productController.switchFavoriteProduct);
router.get('/favorite-products', authMiddleware, productController.getFavoriteProducts);

// categories
router.get('/categories', categoryController.getCategories)
router.post('/categories', categoryController.createCategory)
router.post('/category-settings/:id', categoryController.addCategorySetting)
router.put('/categories/:id', authMiddleware, categoryController.updateCategory);
router.delete('/categories/:id', authMiddleware, categoryController.deleteCategory);
router.post('/delete-category-field/:id', authMiddleware, categoryController.deleteCategoryField)


router.get('/myapp', function(req, res){
  res.send("Hello from the root application URL");
});

module.exports = router;