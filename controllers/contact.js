// .env variables at the top
const { email_host, email_password } = require('../config');
const nodemailer = require('nodemailer');
module.exports.sendEmail = (req, res) => {
  const { name, email, subject, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email_host,
      pass: email_password,
    },
  });
  // I used ChatGPT here to understand how the service works
  // Why I added replyTo as a way to get the senders email address.
  const mailOptions = {
    from: email_host,
    to: email_host,
    subject: `Message from ${name}: ${subject}`,
    text: message,
    replyTo: email,
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
