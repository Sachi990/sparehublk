const Wishlist = require('../models/wishlist.model');

exports.getWishlist = async (req, res) => {
  try {
    const items = await Wishlist.findAll({ where: { userId: req.user.id } });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch wishlist.' });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const newItem = await Wishlist.create({ userId: req.user.id, productId });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Unable to add item to wishlist.' });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    await Wishlist.destroy({ where: { id, userId: req.user.id } });
    res.json({ message: 'Item removed from wishlist.' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to remove item from wishlist.' });
  }
};
