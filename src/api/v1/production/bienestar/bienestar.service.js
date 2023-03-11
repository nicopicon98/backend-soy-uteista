const { send } = require("./config/crypto.config");

const login = async (req, res) => {
  send({}, res);
};

const register = async (req, res) => {
  send({}, res);
};
const rejectDate = async (req, res) => {
  send({}, res);
};
const getServices = async (req, res) => {
  send({}, res);
};
const assignLocation = async (req, res) => {
  send({}, res);
};
const deleteNewService = async (req, res) => {
  send({}, res);
};
const createNewService = async (req, res) => {
  send({}, res);
};
const closeDateByStudent = async (req, res) => {
  send({}, res);
};
const lastDateByProfessional = async (req, res) => {
  send({}, res);
};
const closeDateByProfessional = async (req, res) => {
  send({}, res);
};
const getScheduleByProfessional = async (req, res) => {
  send({}, res);
};
const nextPastDatesByProfessional = async (req, res) => {
  send({}, res);
};
const createScheduleByProfessional = async (req, res) => {
  send({}, res);
};

module.exports = {
  login,
  register,
  rejectDate,
  getServices,
  assignLocation,
  deleteNewService,
  createNewService,
  closeDateByStudent,
  lastDateByProfessional,
  closeDateByProfessional,
  getScheduleByProfessional,
  nextPastDatesByProfessional,
  createScheduleByProfessional,
};
