// email.js
module.exports = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Your Gmail address
    pass: process.env.EMAIL_PASS,  // Your Gmail password or App Password
  }
};
