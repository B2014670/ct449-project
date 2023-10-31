const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth/auth.controller');
const product = require('../controllers/product/product.controller');

router.route('/').get(product.home);

// auth
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/refresh', authController.refreshToken);

//product
// router
//     .route('/product')
//     .get(product.getAllProduct)
//     .post(authMiddleware.isAuth, uploadMiddleware.single('img'), product.create);

// router
//     .route('/product/:id')
//     .put(authMiddleware.isAuth, uploadMiddleware.single('img'), product.update)
//     .delete(authMiddleware.isAuth, product.deleteProduct)
//     .get(product.findById)
//     .post(authMiddleware.isAuth, cart.create);


module.exports = router;
