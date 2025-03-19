const Cart = require('../models/cart.model');

exports.getCart = async (req, res) => {
  try {
    const cartItems = await Cart.findAll({ where: { userId: req.user.id } });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch cart.' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cartItem = await Cart.create({ userId: req.user.id, productId, quantity });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: 'Unable to add to cart.' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.destroy({ where: { id, userId: req.user.id } });
    res.json({ message: 'Item removed from cart.' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to remove from cart.' });
  }
};
