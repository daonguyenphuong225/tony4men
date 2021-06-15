const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

exports.hashPassword = (rawPassword) =>{
    return bcrypt.hashSync(rawPassword, salt);
};

exports.comparePassword = (rawPassword,hashedPassword) =>{
    const match = bcrypt.compareSync(rawPassword,hashedPassword);
    return match;
}
