const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');

// Admin login endpoint
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: admin.id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Admin login failed' });
  }
};

exports.dashboard = (req, res) => {
  res.json({
    message: 'Welcome to Admin Dashboard',
    salesData: { monthlyRevenue: [5000, 7000, 8000, 6000, 9000, 7500] },
    bestSelling: [{ product: 'Brake Pads', sold: 120 }, { product: 'Oil Filter', sold: 100 }]
  });
};
