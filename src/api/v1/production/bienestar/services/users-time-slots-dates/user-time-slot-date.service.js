const UserTimeSlotsDateRepository = require("../../repositories/users-time-slots-dates");

class UserTimeSlotsDateService {
  static async getAllByProfessional(id_professional) {
    const rows = await UserTimeSlotsDateRepository.getAllByUserId(
      id_professional
    );
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

  static async insert(id_user, user_time_slots_date) {
    return UserTimeSlotsDateRepository.insert(id_user, user_time_slots_date);
  }

  static async delete(id_user_time_slot_date) {
    return await UserTimeSlotsDateRepository.delete(id_user_time_slot_date);
  }

  static async getUpcomingByCampus(id_campus) {
    const result = await UserTimeSlotsDateRepository.getUpcomingByCampus(id_campus);
  
    let formattedResult = [];
    let currentDate = null;
  
    for (let row of result) {
      if (currentDate !== row.date) {
        currentDate = row.date;
        formattedResult.push({
          date: currentDate,
          user_time_slot: [],
        });
      }
  
      const userTimeSlot = formattedResult.find((item) => item.date === currentDate);
      userTimeSlot.user_time_slot.push({
        id_user: row.id_user,
        time_slots: [
          {
            id_time_slot: row.id_time_slot,
            id_user_time_slot_date: row.id_user_time_slot_date,
          },
        ],
      });
    }
  
    return formattedResult;
  }
}

module.exports = UserTimeSlotsDateService;
