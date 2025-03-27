// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center p-4">
        <motion.div className="animate-pulse bg-gray-300 h-96 mb-4 rounded" initial={{ opacity: 0 }} animate={{ opacity: 1 }}></motion.div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center p-4">Product not found.</div>;
  }

  const handleImageChange = (index) => {
    setCurrentImage(index);
  };

  return (
    <motion.div className="container mx-auto p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          {product.images && product.images.length > 0 ? (
            <>
              <img
                src={product.images[currentImage]}
                alt={`${product.name} ${currentImage + 1}`}
                className="w-full h-96 object-cover mb-4 rounded"
              />
              {product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-20 h-20 object-cover cursor-pointer rounded border ${currentImage === index ? 'border-accent' : 'border-gray-300'}`}
                      onClick={() => handleImageChange(index)}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <img src="/placeholder.jpg" alt="Placeholder" className="w-full h-96 object-cover mb-4 rounded" />
          )}
        </div>
        <div className="md:w-1/2 md:pl-8">
          <p className="text-xl text-accent font-semibold">
            ${(product.price * (1 - product.discount / 100)).toFixed(2)}
          </p>
          {product.discount > 0 && (
            <p className="line-through text-gray-500">${product.price.toFixed(2)}</p>
          )}
          <div className="mt-4">
            <p className="mb-2">{product.description}</p>
            <div className="space-y-1">
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Model:</strong> {product.model}</p>
              <p><strong>Category:</strong> {product.category}</p>
              {product.subcategory && <p><strong>Subcategory:</strong> {product.subcategory}</p>}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductDetail;
