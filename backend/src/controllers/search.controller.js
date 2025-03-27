// controllers/search.controller.js
const { Op } = require('sequelize');
const Product = require('../models/product.model');

exports.getAdvancedSuggestions = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.trim() === '') {
      return res.json({ suggestions: [] });
    }
    // Search across multiple fields using case-insensitive matching (PostgreSQL)
    const suggestions = await Product.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } },
          { brand: { [Op.iLike]: `%${query}%` } },
          { model: { [Op.iLike]: `%${query}%` } },
          { productType: { [Op.iLike]: `%${query}%` } },
        ]
      },
      attributes: ['id', 'name', 'brand', 'model', 'productType'],
      limit: 10,
      order: [['name', 'ASC']]
    });
    res.json({ suggestions });
  } catch (error) {
    console.error('Advanced search error:', error);
    res.status(500).json({ error: 'Failed to fetch advanced suggestions' });
  }
};
