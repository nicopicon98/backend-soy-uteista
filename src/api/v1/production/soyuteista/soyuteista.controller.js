const express = require("express");
const soyuteista = express.Router();
const {
  carnetEntrada,
  qualificationEntrada,
  scheduleEntrada,
  professionalsByFieldEntrada,
  scheduleByProfessional,
  insertAppointment,
  deleteAppointments,
  enabledModulesEntrada,
  podcastEntrada,
  exitoEscolarEntrada,
  find,
  create,
  remove,
  findDependencia,
  createDependencia,
  removeDependencia,
  basicInfo,
} = require("./soyuteista.service");

const { encrypt } = require("../bienestar/config");

const KEY = "f910fd9b70mshc4e59787d044bc3p10ea5ejsnbd1f4b7fe6f7";
soyuteista.use((req, res, next) => {
  if (req.header("X-WebServiceUTSAPI-Key") != KEY) {
    return res.json({
      error: {
        code: "InvalidAuthenticationToken",
        message: "Access token is Invalid",
        innerError: {
          date: new Date(),
          "request-id": req.query.email,
          "client-request-id": req.query.email,
        },
      },
    });
  } else {
    next();
  }
});

soyuteista.post("/enco", (req, res) => {
  const data = req.body;
  console.log(data);
  const encryptedContent = encrypt(JSON.stringify(data));
  const { content } = encryptedContent;
  res.json({ content });
});

soyuteista.get("/carnet", carnetEntrada);

soyuteista.get("/qualification", qualificationEntrada);

soyuteista.get("/schedule", scheduleEntrada);

soyuteista.get("/enabled-modules", enabledModulesEntrada);

soyuteista.get("/podcast", podcastEntrada);

soyuteista.get("/exito-escolar", exitoEscolarEntrada);

soyuteista.get(
  "/bienestar/professionals-by-field",
  professionalsByFieldEntrada
);

soyuteista.get("/bienestar/schedule-by-professional", scheduleByProfessional);

soyuteista.get("/convocatorias", find);

soyuteista.post("/convocatorias", create);

soyuteista.get("/dependencias", findDependencia);

soyuteista.post("/dependencias", createDependencia);

soyuteista.post("/bienestar/insert-appointment", insertAppointment);

soyuteista.delete("/convocatorias/:idConvocatoria", remove);

soyuteista.delete("/bienestar/delete-appointments", deleteAppointments);

soyuteista.delete("/dependencias/:idDependencia", removeDependencia);

soyuteista.post("/get-app-basic-info", basicInfo);

module.exports = {
  soyuteista,
};
