const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "aplicacionmovil@correo.uts.edu.co",
    pass: "Jgomez21!",
  },
});

// // Define los detalles del correo electrónico que deseas enviar
// let mailOptions = {
//     from: 'tucorreo@tuempresa.com',
//     to: 'destinatario@otraempresa.com',
//     subject: 'Asunto del correo electrónico',
//     text: 'Contenido del correo electrónico'
// };

// // Envía el correo electrónico utilizando el transporter y los mailOptions
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Correo electrónico enviado: ' + info.response);
//     }
// });

module.exports = {
  mailer: transporter,
};
