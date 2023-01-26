const { response } = require("express");
const { Descrypt, Encrypt } = require("../../../../common/security/encryption");
const { loginService, registerService } = require("./services");

let resp;

const login = async (req, res = response) => {
    req.body = Descrypt(req.body);
    try {
        const { usuario, clave } = req.body;
        resp = await loginService(usuario, clave);
    } catch (error) {
        resp = error;
    }
    res.json(Encrypt(resp));
};

const register = async (req, res = response) => {
    req.body = Descrypt(req.body);
    try {
        const { usuario, clave } = req.body;
        resp = await registerService(usuario, clave);
    } catch (error) {
        resp = error;
    }
    res.json(Encrypt(resp));
};

module.exports = {
    login,
    register
};
