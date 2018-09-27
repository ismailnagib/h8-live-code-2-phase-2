var express = require('express');
var router = express.Router();
var { show, add, search } = require('../controllers/statusController')
var { isLogin } = require('../middlewares/isLogin')

router.get('/', show)
router.post('/', isLogin, add)
router.post('/checklogin', isLogin, (req, res) => {res.status(200).json({isLogin: true})})
router.post('/search', isLogin, search)

module.exports = router;