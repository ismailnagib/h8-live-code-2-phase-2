var express = require('express');
var router = express.Router();
var { register, login, showRandom } = require('../controllers/userController')
var { isLogin } = require('../middlewares/isLogin')

router.post('/register', register)
router.post('/login', login)
router.post('/checklogin', isLogin, (req, res) => {res.status(200).json({isLogin: true})})
router.post('/random', isLogin, showRandom)

module.exports = router;
