const router = require('express').Router();

const register = require('../controllers/user/Register');
const login = require('../controllers/user/Login');
const fetchUserById = require('../controllers/user/FetchUserById');
const fetchAllUsers = require('../controllers/user/FetchAllUsers');
const removeUserById = require('../controllers/user/RemoveUserById');
const updateUserById = require('../controllers/user/UpdateUserById');

router.post('/register', register);
router.post('/login', login);
router.get('/get', fetchUserById);
router.get('/all', fetchAllUsers);
router.delete('/delete/:id', removeUserById);
router.put('/update/:id', updateUserById);

module.exports = router;
