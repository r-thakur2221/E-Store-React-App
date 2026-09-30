const router = require('express').Router();
const authenticate = require('./../../middlewares/authentication');
const productCtrl = require('./productController');
const uploader=require('./../../middlewares/uploader')

router.route('/')
    .get(authenticate,productCtrl.get)
    .post(uploader.array('images'),authenticate,productCtrl.insert);

router.route('/search')
    .get(productCtrl.search)
    .post(productCtrl.search);

router.route('/:id')
    .get(authenticate,productCtrl.getById)
    .put(uploader.array('images'),authenticate,productCtrl.update)
    .delete(authenticate,productCtrl.remove);

module.exports = router;