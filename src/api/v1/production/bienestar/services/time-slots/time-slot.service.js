const TimeSlotRepository = require("@api_bienestar/repositories/time-slots");

class TimeSlotService {
  async getAllTimeSlots() {
    return await TimeSlotRepository.getAllTimeSlots();
  }

  async getTimeSlotsByProfessional(professional_id) {
    return await TimeSlotRepository.getTimeSlotsByProfessional(
      professional_id,
    );
  }
}

module.exports = new TimeSlotService();
