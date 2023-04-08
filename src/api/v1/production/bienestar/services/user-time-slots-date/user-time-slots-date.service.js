const { mysql } = require("@src/common/conexiones/conexionMysql");
// const UserTimeSlotsDateRepository = require('../../repositories');

class UserTimeSlotsDateService {
  static async getAllByProfessional(professional_id) {
    const query = `
    SELECT
    user_time_slots_date.date,
    GROUP_CONCAT(time_slots.id_time_slot ORDER BY time_slots.id_time_slot) AS time_slot_ids,
    GROUP_CONCAT(time_slots.name_time_slot ORDER BY time_slots.id_time_slot) AS time_slot_names,
    GROUP_CONCAT(user_time_slots_date.id_user_time_slot_date ORDER BY time_slots.id_time_slot) AS user_time_slot_ids
  FROM
    user_time_slots_date
    JOIN users ON user_time_slots_date.id_user = users.id_user
    JOIN time_slots ON user_time_slots_date.id_time_slot = time_slots.id_time_slot
  WHERE
    users.id_user = 1
  GROUP BY
    user_time_slots_date.date
  ORDER BY
    user_time_slots_date.date ASC;
    `;
    const rows = await mysql.executeQuery(query, [professional_id]);

    return rows.map((row) => {
      const timeSlotIds = row.time_slot_ids.split(",");
      const timeSlotNames = row.time_slot_names.split(",");
      const userTimeSlotIds = row.user_time_slot_ids.split(",");
      const timeSlots = timeSlotIds.map((id, index) => ({
        id_user_time_slot_date: parseInt(userTimeSlotIds[index]),
        id_time_slot: parseInt(id),
        name_time_slot: timeSlotNames[index],
      }));
      return { date: row.date, time_slots: timeSlots };
    });
  }
}

module.exports = UserTimeSlotsDateService;


// const UserTimeSlotsDateRepository = require('../../repositories/user-time-slots-date');
// const { mysql } = require("@src/common/conexiones/conexionMysql");
// class UserTimeSlotsDateService {
//   static async getAllByProfessional(professional_id) {
//     // const rows = await UserTimeSlotsDateRepository.getAllByUserId(professional_id);
//     const query = `
//     SELECT
//       user_time_slots_date.date,
//       GROUP_CONCAT(time_slots.id_time_slot ORDER BY time_slots.id_time_slot) AS time_slot_ids,
//       GROUP_CONCAT(time_slots.name_time_slot ORDER BY time_slots.id_time_slot) AS time_slot_names,
//       GROUP_CONCAT(user_time_slots_date.id_user_time_slot_date ORDER BY time_slots.id_time_slot) AS user_time_slot_ids
//     FROM
//       user_time_slots_date
//       JOIN users ON user_time_slots_date.id_user = users.id_user
//       JOIN time_slots ON user_time_slots_date.id_time_slot = time_slots.id_time_slot
//     WHERE
//       users.id_user = ?
//     GROUP BY
//       user_time_slots_date.date
//     ORDER BY
//       user_time_slots_date.date ASC;
//   `;
// const rows = await mysql.executeQuery(query, [professional_id]);
// return [{date: "new date", time_slots: rows}];
//     return rows.map((row) => {
//       const timeSlotIds = row.time_slot_ids.split(",");
//       const timeSlotNames = row.time_slot_names.split(",");
//       const userTimeSlotIds = row.user_time_slot_ids.split(",");
//       const timeSlots = timeSlotIds.map((id, index) => ({
//         id_user_time_slot_date: parseInt(userTimeSlotIds[index]),
//         id_time_slot: parseInt(id),
//         name_time_slot: timeSlotNames[index],
//       }));
//       return { date: row.date, time_slots: rows };
//     });
//   }
// }

// module.exports = UserTimeSlotsDateService;
