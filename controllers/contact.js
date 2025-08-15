const nodemailer = require('nodemailer');
const { email_host, email_password } = require('../config');

module.exports.sendEmail = (req, res) => {
  const { name, email, subject, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email_host,
      password: email_password,
    },
  });

  const mailOptions = {
    from: email,
    to: email_host,
    subject: `Message from ${name}: ${subject}`,
    text: message,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(400).json({
        status: 'error',
        message: 'There was an error in sending the email.',
      });
    }
    res.status(200).json({
      status: 'OK!',
      message: 'Email send successfully!',
      data: info.response,
    });
  });
};
