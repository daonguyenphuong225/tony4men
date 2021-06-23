const router = require("express").Router();

const CategoryRouter = require('./admin/categoriesRoutes')
const ProductRouter = require('./admin/productRoutes');
const LoginRouter = require('./admin/loginRouter');
const UserRouter = require('./user/userRouter');
const CartRouter = require('./admin/cartRouter');

router.use('/',LoginRouter)
router.use('/',CategoryRouter);
router.use('/',ProductRouter);
router.use('/',UserRouter);
router.use('/',CartRouter);


module.exports = router;