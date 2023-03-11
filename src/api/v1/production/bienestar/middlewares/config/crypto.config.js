import "dotenv/config";
import crypto from "crypto-js";
import { Response } from "express";
import cryptoA from "crypto";

const secretKey = process.env.ENCRYPTION_KEY;

// deprecated
const secretKeyA = "2kBFK1ZQI6YoXrKtNBxCzSINV33xlXuh";
const algorithm = "aes-256-cbc";

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

export { decrypt, send, sendService };
