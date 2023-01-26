const bcrypt = require("bcrypt");
const { executeQuery } = require("../../../../../common/conexiones/conexionMysql");
const { comparePassword, hashPassword } = require("../../../../../common/security/bcrypt_encryption");

const GENERAL_ERROR = "Contacta con el administrador";
const loginService = async (usuario, clave) => {
    const query = await executeQuery("SELECT * FROM usuarios WHERE usuario = ?", [usuario]);
    const passwordCompare = await comparePassword(clave, query[0].clave);
    return passwordCompare ? query : { error: GENERAL_ERROR };
};

const registerService = async (usuario, clave) => {
    const password = await hashPassword(clave);
    const query = await executeQuery("INSERT INTO usuarios (usuario, clave) VALUES (?, ?)", [usuario, password]);
    return query.length == 0 ? { error: GENERAL_ERROR } : query
}

module.exports = {
    loginService,
    registerService
}