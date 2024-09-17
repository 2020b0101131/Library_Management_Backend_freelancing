const nodemailer = require('nodemailer');
const contactModel = require('../models/contactModel');
require('dotenv').config();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your email password
  },
});

const sendContactForm = async (req, res) => {
  const { name, email, phone, message } = req.body;
 

  try {
    // Save data to the database
    await contactModel.saveContactForm(name, email, phone, message);

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL, // where you want to send the emails
      subject: 'Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

module.exports = {
  sendContactForm,
};