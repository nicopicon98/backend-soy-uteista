const HTTP_HANDLING_MSGS = {
  successInsertProfessional: (email_user) => {
    return `Usuario creado con éxito, un correo con indicaciones fue enviado al correo electrónico registrado ${email_user}`;
  },
  successInsertProfessionalMailNotSend: (email_user) => {
    return `Usuario creado con éxito, pero no se pudo enviar el correo electrónico de bienvenida a ${email_user}. Por favor, revise que ${email_user} sea el correo electrónico indicado. Si el error persiste, por favor contacte con soporte.`;
  },
  errorDuplicateEntry: (custom_msg) => {
    return [`Entrada duplicada: ${custom_msg}`];
  },
  errorInternalServer: (error) => {
    return [`Error interno del servidor: ${JSON.stringify(error, null, 2)}`];
  },
  successUpdateUser: "Usuario actualizado satisfactoriamente!",
  errorUserNotFound: "Este usuario que estas intentando actualizar, no existe!",
};

module.exports = HTTP_HANDLING_MSGS;
