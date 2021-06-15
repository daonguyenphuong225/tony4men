const express = require('express');
const router = express.Router();
const StatisticsController = require('../../controller/admin/statistics');




router.get('/statistics',StatisticsController.listData)



module.exports = router