const router = require('express').Router();

const createProduct = require('../controllers/product/CreateProduct');
const fetchAllProducts = require('../controllers/product/FetchAllProducts');
const fetchProductById = require('../controllers/product/FetchProductById');
const removeProductById = require('../controllers/product/RemoveProductById');
const updateProductById = require('../controllers/product/UpdateProductById');

router.post('/create', createProduct);
router.put('/update/:id', updateProductById);
router.delete('/delete/:id', removeProductById);
router.get('/get/:id', fetchProductById);
router.get('/all', fetchAllProducts);

module.exports = router;
