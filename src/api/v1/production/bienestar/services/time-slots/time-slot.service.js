const TimeSlotRepository = require("../../repositories/time-slots");

class TimeSlotService {
  async getAllTimeSlots() {
    return await TimeSlotRepository.getAllTimeSlots();
  }

  async getTimeSlotsByProfessional(id_professional) {
    const rawTimeSlots = await TimeSlotRepository.getTimeSlotsByProfessional(
      id_professional
    );
    return this.groupTimeSlotsByScheduleAndDate(rawTimeSlots);
  }

  groupTimeSlotsByScheduleAndDate(rawTimeSlots) {
    const groupedTimeSlots = {};

    rawTimeSlots.forEach((timeSlot) => {
      if (!groupedTimeSlots[timeSlot.id_schedule]) {
        groupedTimeSlots[timeSlot.id_schedule] = {
          id_schedule: timeSlot.id_schedule,
          date: timeSlot.date,
          time_slots: [],
        };
      }
      groupedTimeSlots[timeSlot.id_schedule].time_slots.push({
        id_time_slot: timeSlot.id_time_slot,
        name_time_slot: timeSlot.name_time_slot,
      });
    });

    return Object.values(groupedTimeSlots);
  }
}

module.exports = new TimeSlotService();