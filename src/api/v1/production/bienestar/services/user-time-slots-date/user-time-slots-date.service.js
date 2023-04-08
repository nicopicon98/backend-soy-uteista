const UserTimeSlotsDateRepository = require('../../repositories/user-time-slots-date');

class UserTimeSlotsDateService {
  static async getAllByProfessional(professional_id) {
    const rows = await UserTimeSlotsDateRepository.getAllByUserId(professional_id)
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

  static async insert(professional_id, time_slots_date) {
    return await UserTimeSlotsDateRepository.insert(professional_id, time_slots_date);
  }
}

module.exports = UserTimeSlotsDateService;
