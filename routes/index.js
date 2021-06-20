const router = require("express").Router();

const CategoryRouter = require('./admin/categoriesRoutes')
const StatisticsRouter = require('./admin/statisticsRouter')
const ProvinceRouter = require('./admin/provinceRouter')
const ProductRouter = require('./admin/productRoutes');
const LoginRouter = require('./admin/loginRouter');
const UserRouter = require('./user/userRouter');
// const CartRouter = require('./cartRouter');

router.use('/',LoginRouter)
router.use('/',CategoryRouter);
router.use('/',StatisticsRouter);
router.use('/',ProvinceRouter);
router.use('/',ProductRouter);
router.use('/',UserRouter);
// router.use('/',CartRouter);


module.exports = router;