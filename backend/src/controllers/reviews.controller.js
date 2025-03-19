const Review = require('../models/review.model');

exports.getReviewsByProduct = async (req, res) => {
  try {
    const reviews = await Review.findAll({ where: { productId: req.params.productId } });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch reviews' });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user ? req.user.id : null;
    const review = await Review.create({ productId, userId, rating, comment });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Unable to add review' });
  }
};
