
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

exports.sendWelcome = (email, link) => {
  return transporter.sendMail({
    from: "Sistema",
    to: email,
    subject: "Verifica tu cuenta",
    html: `<h2>Bienvenido</h2><a href="${link}">Verificar cuenta</a>`
  });
};
