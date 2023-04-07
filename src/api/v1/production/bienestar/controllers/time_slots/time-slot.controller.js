const { mysql } = require("../../../../../../common/conexiones/conexionMysql");
const { send } = require("../../config/crypto.config");


const getAllTimeSlots = async (req, res) => {
  const timeSlots = await mysql.executeQuery("SELECT * FROM time_slots");
  send({ data: timeSlots, status: 200 }, res);
};

const getFranjasByProfessional = async (req, res) => {
  const { professional_id, dates } = req.body;
  const [start, end] = dates;
  const timeSlotsByProfessional = await mysql.executeQuery(
    `SELECT * from time_slots ts WHERE NOT EXISTS ( SELECT 1 FROM schedules s WHERE s.time_slot_id = ts.time_slot_id AND s.date BETWEEN ? AND ? AND s.professional_id = ? );`,
    [start, end, professional_id]
  );
  send({ data: timeSlotsByProfessional, status: 200 }, res);
};

module.exports = {
  getAllTimeSlots,
  getFranjasByProfessional,
};