const HTTP_HANDLING_MSGS = {

  //success
  successInsert: (custom_msg = "") => {
    return `Registro: ${custom_msg} insertado con exito`;
  },
  successUpdate: (custom_msg = "") => {
    return `Registro: ${custom_msg} modificado con exito`;
  },
  successDelete: (custom_msg = "") => {
    return `Registro: ${custom_msg} eliminado con exito`;
  },
  successInsertEmailNotSent: function (email = "") {
    return `${this.successInsert(
      email
    )}, pero el email de bienvenida no pudo ser enviado. Verifica que el correo ${email} no contenga errores. Si el error persiste, contacte con soporte.`;
  },

  //error
  errorDeleteDependency: (value = "", dependency = "") => {
    return `Registro: ${value} no se pudo eliminar debido a la dependencia existente con ${dependency}`;
  },
  errorDuplicateEntry: (custom_msg = "") => {
    return `Registro duplicado: ${custom_msg}`;
  },
  errorInternalServer: (error = "") => {
    return `Error interno del servidor: ${JSON.stringify(error, null, 2)}`;
  },
  errorNotFound: (custom_msg = "") => {
    return `Registro no encontrado: ${custom_msg}`;
  },

  //warning

  //info
  
};

module.exports = HTTP_HANDLING_MSGS;
