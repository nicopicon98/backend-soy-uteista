const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

const comparePassword = (plaintextPassword, hash) => {
  return bcrypt.compare(plaintextPassword, hash);
};

module.exports = {
  hashPassword,
  comparePassword,
};
