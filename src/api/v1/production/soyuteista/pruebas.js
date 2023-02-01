const { scheduleByProfessional } = require("./soyuteista.service");

scheduleByProfessional().then(e => {
    console.log(e);
})