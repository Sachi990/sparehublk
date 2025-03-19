const Product = require('../models/product.model');

exports.getProducts = async (req, res) => {
  try {
    const { category, brand, model } = req.query;
    const where = {};
    if (category) where.category = category;
    if (brand) where.brand = brand;
    if (model) where.model = model;
    const products = await Product.findAll({ where });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch products' });
  }
}

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, model, brand, description, price, discount, stock, images } = req.body;
    const product = await Product.create({
      name,
      model,
      brand,
      description,
      price,
      discount,
      stock,
      images
    });
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { name, model, brand, description, price, discount, stock, images } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    product.name = name || product.name;
    product.model = model || product.model;
    product.brand = brand || product.brand;
    product.description = description || product.description;
    product.price = price || product.price;
    product.discount = discount !== undefined ? discount : product.discount;
    product.stock = stock !== undefined ? stock : product.stock;
    product.images = images || product.images;
    
    await product.save();
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
