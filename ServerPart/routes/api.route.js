const router = require('express').Router()
const authRouter = require('./../controllers/auth.controller');
const userRouter = require('./../controllers/user.controller');
const productRouter = require('./../modules/product/productRoute');
const authenticate = require('./../middlewares/authentication');
const notesRouter = require('./../modules/NotePad/noteRoute');

//Router middleware use
//mount all incoming request as per URL
router.use('/auth', authRouter);
router.use('/user',authenticate ,userRouter);
router.use('/product', productRouter);
router.use('/note', notesRouter);


module.exports = router;
