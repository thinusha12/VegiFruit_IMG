const router = require('express').Router();

const createOrder = require('../controllers/order/CreateOrder');
const fetchAllOrders = require('../controllers/order/FetchAllOrders');
const fetchOrderById = require('../controllers/order/FetchOrderById');
const fetchOrdersByUserId = require('../controllers/order/FetchOrdersByUserId');

router.post('/create', createOrder);
router.get('/all', fetchAllOrders);
router.get('/get', fetchOrderById);
router.get('/get/user', fetchOrdersByUserId);

module.exports = router;
