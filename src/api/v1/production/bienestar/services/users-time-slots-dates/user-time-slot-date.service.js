const UserTimeSlotsDateRepository = require('../../repositories/users-time-slots-dates');

class UserTimeSlotsDateService {
  static async getAllByProfessional(id_professional) {
    const rows = await UserTimeSlotsDateRepository.getAllByUserId(id_professional)
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

  static async insert(id_user, users_time_slots_dates) {
    return UserTimeSlotsDateRepository.insert(id_user, users_time_slots_dates);
  }
}

module.exports = UserTimeSlotsDateService;
