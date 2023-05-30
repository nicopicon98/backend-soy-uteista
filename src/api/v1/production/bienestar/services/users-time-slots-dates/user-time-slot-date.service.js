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
    const formattedResult = []; // Array to hold the final formatted result.

    let currentObject = {}; // An object to hold the current entry.

    // Loop over each row in the raw result.
    for (const row of result) {
      const rowDate = row.date.toISOString();
      const userID = row.id_user;

      // If the date or userID are different, or if the currentObject is empty,
      // create a new entry in formattedResult
      if (
        !currentObject.date ||
        currentObject.date !== rowDate ||
        currentObject.user_time_slot[0].id_user !== userID
      ) {
        currentObject = {
          date: rowDate,
          user_time_slot: [
            {
              id_user: userID,
              time_slots: [],
            },
          ],
        };

        // Add currentObject to formattedResult
        formattedResult.push(currentObject);
      }

      // Add the time slot to the current user_time_slot
      currentObject.user_time_slot[0].time_slots.push({
        id_time_slot: row.id_time_slot,
        id_user_time_slot_date: row.id_user_time_slot_date,
      });
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
