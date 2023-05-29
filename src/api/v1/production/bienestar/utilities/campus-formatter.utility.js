class CampusFormatter {
  static campusMapping = {
    "SEDE PRINCIPAL": "1",
    "SEDE BARRANCABERMEJA": "2",
    "SEDE SAN JOSE DE CÚCUTA": "3",
    "SEDE PIEDECUESTA": "4",
    "SEDE SAN GIL": "5",
    "SEDE VÉLEZ": "6",
    "EDUCACIÓN VIRTUAL": "7",
  };

  static isNumber(str) {
    return !isNaN(+str);
  }
}

module.exports = CampusFormatter;
