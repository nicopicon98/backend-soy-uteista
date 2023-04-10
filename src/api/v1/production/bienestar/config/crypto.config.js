const crypto = require("crypto-js");

const encrypt = (data) => {
  const ciphertext = crypto.AES.encrypt(
    data,
    process.env.SECRET_KEY
  ).toString();

  return { content: ciphertext };
};

const decrypt = (json) => {
  const { content } = json;

  const bytes = crypto.AES.decrypt(content, process.env.SECRET_KEY);

  try {
    const originalText = JSON.parse(bytes.toString(crypto.enc.Utf8));
    return originalText;
  } catch (error) {
    return {};
  }
};

const send = (json, res) => {
  const encryptText = encrypt(JSON.stringify(json));
  res.json(encryptText);
};

const sendService = (json, res) => {
  res.json(json);
};

module.exports = { decrypt, send, sendService, encrypt };
