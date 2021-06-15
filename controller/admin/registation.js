const RegModel = require('../../models/registation')
const jwt = require('jsonwebtoken')

const bcryptjs = require('../../service/login');

exports.loginForm = function (req, res) {
    res.render('admin/login.ejs')
}
exports.login = function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password
    RegModel.findOne({
        username: username
    })
        .then((data) => {
            if (data) {
                const matchPassword = bcryptjs.comparePassword(password, data.password);

                if (matchPassword) {
                        const token = jwt.sign({
                            _id: data._id
                        }, 'phuong225')
                        res.json({
                            message: "Thành công",
                            token: token
                        })
                    
                }
                res.json(0)
            }
            res.json(1)
        })
        .catch((err) => {
            res.json(err)
        })
}

exports.create = function (req, res) {
    let { username, password } = req.body;
    const hashed = bcryptjs.hashPassword(password)
    RegModel.create({ username: username, password: hashed })
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json(err)
        })
}