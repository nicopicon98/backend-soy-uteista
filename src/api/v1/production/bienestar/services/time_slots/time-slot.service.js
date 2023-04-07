const TimeSlotRepository = require("@api_bienestar/reporitories/time-slot");

class TimeSlotService {
  async getAllTimeSlots() {
    return await TimeSlotRepository.getAllTimeSlots();
  }

  async getTimeSlotsByProfessional(professional_id, dates) {
    const [start, end] = dates;
    return await TimeSlotRepository.getTimeSlotsByProfessional(professional_id, start, end);
  }
}

module.exports = new TimeSlotService();