const nodemailer = require('nodemailer');
const config = require('../config');

const sendEmail = async (sendToEmail, template) => {
  const { subject, text, html } = template;

  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PW,
    },
  });

  const message = {
    from: `${config.FROM_NAME} <${config.FROM_EMAIL}>`,
    to: sendToEmail,
    subject,
    text,
    html,
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
