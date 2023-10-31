const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth/auth.controller');
const product = require('../controllers/product/product.controller');
const authMiddleware = require('../controllers/auth/auth.middlewares');
const uploadMiddleware = require('../middlewares/multer');

router.route('/').get(product.home);

// auth
router.post('/auth/register', auth.register);
router.post('/auth/login', auth.login);
router.post('/auth/refresh', auth.refreshToken);

//product
router
    .route('/product')
    .get(product.getAllProduct)
    // .post(authMiddleware.isAuth, product.createProduct);//khong co img
    .post(authMiddleware.isAuth, uploadMiddleware.single('img'), product.create); //co img

router
    .route('/product/:id')
    .put(authMiddleware.isAuth, uploadMiddleware.single('img'), product.update)
    .delete(authMiddleware.isAuth, product.deleteProduct)
    .get(product.findById)
    // .post(authMiddleware.isAuth, cart.create);

module.exports = router;
