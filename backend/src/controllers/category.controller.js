// controllers/category.controller.js
const Category = require('../models/category.model');

/**
 * Fetch all categories along with their subcategories.
 */
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [['name', 'ASC']]
    });
    res.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Unable to fetch categories' });
  }
};

/**
 * (Optional) Create a new category.
 */
exports.createCategory = async (req, res) => {
  try {
    const { name, subcategories } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }
    const category = await Category.create({ name, subcategories });
    res.status(201).json({ message: 'Category created', category });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
};

// You can add update and delete functions similarly.
