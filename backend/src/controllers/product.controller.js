// controllers/product.controller.js
const { Op } = require('sequelize');
const Product = require('../models/product.model');

exports.getProducts = async (req, res) => {
  try {
    // Get query parameters
    const {
      category,
      subcategory,
      brand,
      model,
      productType,
      featured,
      page = 1,
      limit = 10,
      search,
    } = req.query;

    // Build filter object dynamically
    const where = {};
    if (category) where.category = category;
    if (subcategory) where.subcategory = subcategory;
    if (brand) where.brand = brand;
    if (model) where.model = model;
    if (productType) where.productType = productType;
    if (featured !== undefined) {
      where.featured = featured === 'true';
    }
    if (search) {
      // Using Sequelize Op.like for pattern matching on product name
      where.name = { [Op.like]: `%${search}%` };
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const offset = (pageNum - 1) * limitNum;

    const products = await Product.findAndCountAll({
      where,
      limit: limitNum,
      offset,
      order: [['createdAt', 'DESC']],
    });

    res.json({
      total: products.count,
      currentPage: pageNum,
      totalPages: Math.ceil(products.count / limitNum),
      data: products.rows,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Unable to fetch products' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      console.error('Product not found for ID:', req.params.id);
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Error fetching product' });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const {
      uniqueProductId,
      name,
      model,
      brand,
      description,
      price,
      discount,
      stock,
      images,
      buyingPrice,
      category,
      subcategory,
      productType,
      featured,
    } = req.body;

    // Basic validation for required fields
    if (!name || !brand || price === undefined || stock === undefined) {
      console.error('Missing required fields in addProduct');
      return res.status(400).json({ error: 'Missing required fields: name, brand, price, and stock' });
    }

    const product = await Product.create({
      uniqueProductId,
      name,
      model,
      brand,
      description,
      price: parseFloat(price),
      discount: discount ? parseFloat(discount) : 0,
      stock: parseInt(stock, 10),
      images,
      buyingPrice: buyingPrice ? parseFloat(buyingPrice) : null,
      category,
      subcategory,
      productType,
      featured: featured || false,
    });
    console.log('Product added successfully:', product.id);
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    console.error('Failed to add product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const {
      uniqueProductId,
      name,
      model,
      brand,
      description,
      price,
      discount,
      stock,
      images,
      buyingPrice,
      category,
      subcategory,
      productType,
      featured,
    } = req.body;

    const product = await Product.findByPk(req.params.id);
    if (!product) {
      console.error('Product not found for update, ID:', req.params.id);
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update fields if provided
    if (uniqueProductId !== undefined) product.uniqueProductId = uniqueProductId;
    if (name !== undefined) product.name = name;
    if (model !== undefined) product.model = model;
    if (brand !== undefined) product.brand = brand;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = parseFloat(price);
    if (discount !== undefined) product.discount = parseFloat(discount);
    if (stock !== undefined) product.stock = parseInt(stock, 10);
    if (images !== undefined) product.images = images;
    if (buyingPrice !== undefined) product.buyingPrice = parseFloat(buyingPrice);
    if (category !== undefined) product.category = category;
    if (subcategory !== undefined) product.subcategory = subcategory;
    if (productType !== undefined) product.productType = productType;
    if (featured !== undefined) product.featured = featured;

    await product.save();
    console.log('Product updated successfully:', product.id);
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Failed to update product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      console.error('Product not found for deletion, ID:', req.params.id);
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.destroy();
    console.log('Product deleted successfully:', req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Failed to delete product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
