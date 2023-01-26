const CryptoJS = require("crypto-js");
const MASTER_KEY = "Ep0N02X0TgPEoFn0HJlzRNRmKaY";

const Encrypt = (payload) => {
  const ciphertext = CryptoJS.AES.encrypt(payload, MASTER_KEY).toString();
  return ciphertext;
};

const Descrypt = (payload) => {
  const bytes = CryptoJS.AES.decrypt(payload, MASTER_KEY);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

module.exports = {
  Encrypt,
  Descrypt,
};
