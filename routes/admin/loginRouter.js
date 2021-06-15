const express = require('express');
const router = express.Router();
const RegController = require('../../controller/admin/registation');
const jwt = require('jsonwebtoken')

router.get('/login',RegController.loginForm)
router.post('/login',RegController.login)
// router.post('/login/registation',RegController.create)

module.exports = router