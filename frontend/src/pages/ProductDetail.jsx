// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import WishlistButton from '../components/WishlistButton';
import AddToCartButton from '../components/AddToCartButton';
import { motion } from 'framer-motion';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error('Fetch product error:', err));

    axios.get(`/api/reviews/${id}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error('Fetch reviews error:', err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          {product.images.length > 0 ? (
            product.images.map((img, index) => (
              <img key={index} src={img} alt={`${product.name} ${index}`} className="w-full mb-2" />
            ))
          ) : (
            <img src="/placeholder.jpg" alt="Placeholder" className="w-full mb-2" />
          )}
        </div>
        <div className="md:w-1/2 md:pl-4">
          <p className="text-xl text-accent font-semibold">
            ${(product.price * (1 - product.discount / 100)).toFixed(2)}
          </p>
          {product.discount > 0 && (
            <p className="line-through text-gray-500">${product.price.toFixed(2)}</p>
          )}
          <p className="mt-4">{product.description}</p>
          <div className="flex space-x-4 mt-4">
            <WishlistButton productId={product.id} />
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="border p-2 mb-2">
              <p>Rating: {review.rating} / 5</p>
              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}

export default ProductDetail;
