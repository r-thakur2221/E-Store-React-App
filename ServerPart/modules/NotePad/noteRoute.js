const router = require('express').Router();
const authenticate = require('./../../middlewares/authentication');
const noteControl = require('./noteController');

router.route('/')
    .get(authenticate,noteControl.get)
    .post(authenticate,noteControl.insert);

// router.route('/search')
//     .get(noteControl.search)
//     .post(noteControl.search);

router.route('/:id')
    // .get(authenticate,noteControl.getById)
    .put(authenticate,noteControl.update)
    .delete(authenticate,noteControl.remove);

module.exports = router;