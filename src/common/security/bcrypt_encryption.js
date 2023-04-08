const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const saltRounds = 10;
  console.log('Password:', password, 'Salt Rounds:', saltRounds); // Add this line
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword, "hashedPassword")
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
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
