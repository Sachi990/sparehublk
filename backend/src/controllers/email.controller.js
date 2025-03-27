// controllers/email.controller.js
const nodemailer = require('nodemailer');
const emailConfig = require('../config/email');

const transporter = nodemailer.createTransport(emailConfig);

exports.sendOrderConfirmation = async (order, userEmail) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: `Order Confirmation - Order #${order.id}`,
    html: `
      <h1>Thank you for your order!</h1>
      <p>Your order total is $${order.total}.</p>
      <p>Your tracking number is: ${order.trackingNumber}</p>
      <p>We will update you when your order status changes.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent successfully.');
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    throw error;
  }
};
