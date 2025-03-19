const Order = require('../models/order.model');

exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create({ 
      userId: req.user.id, 
      total: req.body.total,
      trackingNumber: 'TRK' + Date.now(),
      status: 'Pending'
    });
    global.io.emit('orderUpdate', { orderId: order.id, status: 'created' });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.createGuestOrder = async (req, res) => {
  try {
    const { guestName, guestEmail, total } = req.body;
    const order = await Order.create({ userId: null, total, trackingNumber: 'TRK' + Date.now(), status: 'Pending' });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create guest order' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.user.id } });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch orders' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    order.status = status;
    await order.save();
    res.json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
};
