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

  static formatter(result) {
    let formattedResult = []; // Array to hold the final formatted result.
    let currentDate = null; // Variable to track the current date being processed.
    let currentUser = null; // Variable to track the current user being processed.

    // Loop over each row in the raw result.
    for (let row of result) {
      // Convert the date to ISO string format.
      const rowDate = row.date.toISOString();

      // Check if the date or user ID has changed.
      if (currentDate !== rowDate || currentUser !== row.id_user) {
        // If the date or user ID has changed, update current date and current user.
        currentDate = rowDate;
        currentUser = row.id_user;

        // Add a new entry to the formatted result for the new date and user.
        formattedResult.push({
          date: currentDate,
          user_time_slot: [
            {
              id_user: row.id_user,
              time_slots: [
                {
                  id_time_slot: row.id_time_slot,
                  id_user_time_slot_date: row.id_user_time_slot_date,
                },
              ],
            },
          ],
        });
      } else {
        // If the date and user ID are the same as the last entry, add to the existing entry.

        const index = formattedResult.length - 1; // Index of the last entry in the formatted result.

        if (currentUser === row.id_user) {
          // If current user is the same, add the new time slot to the existing user's time slots.
          formattedResult[index].user_time_slot[0].time_slots.push({
            id_time_slot: row.id_time_slot,
            id_user_time_slot_date: row.id_user_time_slot_date,
          });
        } else {
          // If current user is different, add a new user_time_slot object to the current date.
          formattedResult[index].user_time_slot.push({
            id_user: row.id_user,
            time_slots: [
              {
                id_time_slot: row.id_time_slot,
                id_user_time_slot_date: row.id_user_time_slot_date,
              },
            ],
          });
        }
      }
    }

    // Return the final formatted result.
    return formattedResult;
  }

  static async getUpcomingByCampus(id_campus) {
    const result = await UserTimeSlotsDateRepository.getUpcomingByCampus(
      id_campus
    );
    result.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    console.log("this is the result before being formatted", result);
    return UserTimeSlotsDateService.formatter(result);
  }
}

module.exports = UserTimeSlotsDateService;
