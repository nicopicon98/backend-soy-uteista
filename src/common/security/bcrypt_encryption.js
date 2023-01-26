const bcrypt = require("bcrypt")

const hashPassword = (plaintextPassword) => {
    return bcrypt.hash(plaintextPassword, 10);
}

const comparePassword = (plaintextPassword, hash) => {
    return bcrypt.compare(plaintextPassword, hash);
}

module.exports = {
    hashPassword,
    comparePassword
}