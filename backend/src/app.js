const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

// Security HTTP headers
app.use(helmet());

// Dev logger
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Rate limiter
app.use(rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
}));

// Body parser
app.use(express.json());

// Data sanitization against NoSQL injection and XSS
app.use(mongoSanitize());
app.use(xss());

// CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://yourdomain.com' : 'http://localhost:5173',
  credentials: true
}));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/reports', require('./routes/reports.routes'));
app.use('/api/wishlist', require('./routes/wishlist.routes'));
app.use('/api/cart', require('./routes/cart.routes'));
app.use('/api/reviews', require('./routes/reviews.routes'));
app.use('/api/payment', require('./routes/payment.routes'));
app.use('/api/settings', require('./routes/settings.routes'));
app.use('/api/categories', require('./routes/category.routes'));
app.use('/api/search', require('./routes/search.routes'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;
