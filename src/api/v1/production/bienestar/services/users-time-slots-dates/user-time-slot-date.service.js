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

    let currentDate = null; // Holds the current date being processed.
    let currentUser = null; // Holds the current user being processed.
    let currentObject = null; // An object to hold the current entry.
    let currentUserSlot = null; // An object to hold the current user_time_slot.
    let currentNameUser = null;

    // Loop over each row in the raw result.
    for (const row of result) {
      const rowDate = row.date.toISOString();
      const userID = row.id_user;

      // If we've moved to a new date or user, we need to create new objects.
      if (currentDate !== rowDate || currentUser !== userID) {
        currentDate = rowDate;
        currentUser = userID;
        currentNameUser = row.name_user;

        // Find or create the object for this date.
        currentObject = formattedResult.find((o) => o.date === currentDate);
        if (!currentObject) {
          currentObject = {
            date: currentDate,
            user_time_slot: [],
          };
          formattedResult.push(currentObject);
        }

        // Find or create the user_time_slot for this user.
        currentUserSlot = currentObject.user_time_slot.find(
          (u) => u.id_user === currentUser
        );
        if (!currentUserSlot) {
          currentUserSlot = {
            id_user: currentUser,
            name_user: currentNameUser,
            time_slots: [],
          };
          currentObject.user_time_slot.push(currentUserSlot);
        }
      }

      // Add the time slot to the current user_time_slot.
      currentUserSlot.time_slots.push({
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
