const APPOINTMENT_ROUTES_MODEL = {
  GET_LAST_BY_PROFESSIONAL : '/get-last-appointment-by-professional',
  GET_ALL_LAST_BY_PROFESSIONAL : '/get-all-last-appointments-by-professional',
  GET_ALL_LAST_MONTH_TO_NOW_BY_PROFESSIONAL : '/get-all-last-month-to-now-appointments-by-professional',
  GET_UPCOMING_BY_PROFESSIONAL : '/get-upcoming-appointment-by-professional',
  GET_ALL_UPCOMING_BY_PROFESSIONAL : '/get-all-upcoming-appointments-by-professional',
  INSERT : '/insert-appointment',
  UPDATE_ATTENTED: '/update-appointment-attended',
  UPDATE_REJECTED : '/update-appointment-rejected'
};

module.exports = APPOINTMENT_ROUTES_MODEL;
