const nodemailer = require("nodemailer");

class MailerService {
  constructor() {
    this.transporter = this.createTransporter();
    console.log(process.env.SMTP_HOST, "SMTP_HOST");
    console.log(process.env.SMTP_PORT, "SMTP_PORT");
    console.log(process.env.SMTP_USER, "SMTP_USER");
    console.log(process.env.SMTP_PASS, "SMTP_PASS");
  }

  // Create a transporter using environment variables
  createTransporter() {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  prepareEmail(to, subject, text, attachments) {
    return {
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
      attachments,
    };
  }

  // Separate email template into a function for maintainability
  welcomeUserEmailTemplate(name, email, password) {
    return `
      Estimado ${name},

      Esperamos que se encuentre bien. Nos complace informarle que su cuenta en Bienestar Institucional ha sido creada exitosamente. Estamos emocionados de tenerlo con nosotros y de poder brindarle una experiencia excepcional en nuestro sistema.

      A continuación, encontrará sus credenciales de acceso:

      Correo: ${email}
      Contraseña: ${password}

      Gracias por elegir Bienestar Institucional. Estamos seguros de que disfrutará de nuestra plataforma y de todo lo que tiene para ofrecer.

      Cordialmente,

      SoyUteísta
    `;
  }

  async sendWelcomeUserEmail(name, email, password) {
    const emailOptions = this.prepareEmail(
      email,
      "Bienvenido a Bienestar - Sus credenciales de acceso",
      this.welcomeUserEmailTemplate(name, email, password)
    );
    try {
      const info = await this.transporter.sendMail(emailOptions);
      console.log("Correo electrónico enviado: " + info.response);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = new MailerService();
