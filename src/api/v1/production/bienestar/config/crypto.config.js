const crypto = require("crypto-js");

const secretKey = "REACTANDNODEWORKS4EVER!";

const encrypt = (data) => {
  const ciphertext = crypto.AES.encrypt(data, secretKey).toString();

  return { content: ciphertext };
};

const decrypt = (json) => {
  const { content } = json;

  const bytes = crypto.AES.decrypt(content, secretKey);

  try {
    const originalText = JSON.parse(bytes.toString(crypto.enc.Utf8));
    return originalText;
  } catch (error) {
    console.log(error, "Error descrypting");
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

module.exports = { decrypt, send, sendService };
