const {
  getAllUserTimeSlotsDateByProfessionalValidationRules,
  validategetAllUserTimeSlotsDateByProfessional,
} = require("./get-all-by-professional.middleware");
const {
  insertUserTimeSlotsDateValidationRules,
  validateInsertUserTimeSlotsDate,
} = require("./insert.middleware");

module.exports = {
  getAllUserTimeSlotsDateByProfessionalValidationRules,
  validategetAllUserTimeSlotsDateByProfessional,
  insertUserTimeSlotsDateValidationRules,
  validateInsertUserTimeSlotsDate,
};
