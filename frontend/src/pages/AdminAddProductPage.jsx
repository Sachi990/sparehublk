// src/pages/AdminAddProductPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const defaultCategoryOptions = [
  { value: 'Bearing', label: 'Bearing' },
  { value: 'Foot Controls & Pegs', label: 'Foot Controls & Pegs' },
  { value: 'Drive Belts & Pulleys', label: 'Drive Belts & Pulleys' },
  { value: 'Chain Sprocket Kit', label: 'Chain Sprocket Kit' },
  { value: 'Gaskets & Seals', label: 'Gaskets & Seals' },
];

const defaultSubcategoryOptions = [
  { value: 'Sub1', label: 'Sub1' },
  { value: 'Sub2', label: 'Sub2' },
];

const defaultBrandOptions = [
  { value: 'Honda', label: 'Honda' },
  { value: 'Yamaha', label: 'Yamaha' },
  { value: 'Suzuki', label: 'Suzuki' },
];

const defaultModelOptions = [
  { value: 'Model1', label: 'Model1' },
  { value: 'Model2', label: 'Model2' },
];

const productTypeOptions = [
  { value: 'Spare Part', label: 'Spare Part' },
  { value: 'Accessory', label: 'Accessory' },
];

function AdminAddProductPage() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    uniqueProductId: '',
    name: '',
    model: '',
    brand: '',
    description: '',
    price: '',
    discount: '',
    stock: '',
    buyingPrice: '',
    featured: false,
    images: [],
    category: '',
    subcategory: '',
    productType: '',
  });
  const [fileList, setFileList] = useState([]);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  // Toggles for new entries
  const [newCategory, setNewCategory] = useState('');
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newSubcategory, setNewSubcategory] = useState('');
  const [isNewSubcategory, setIsNewSubcategory] = useState(false);
  const [newBrand, setNewBrand] = useState('');
  const [isNewBrand, setIsNewBrand] = useState(false);
  const [newModel, setNewModel] = useState('');
  const [isNewModel, setIsNewModel] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFileList(e.target.files);
  };

  const handleCategoryChange = (selectedOption) => {
    setProductData((prev) => ({ ...prev, category: selectedOption.value }));
  };

  const handleSubcategoryChange = (selectedOption) => {
    setProductData((prev) => ({ ...prev, subcategory: selectedOption.value }));
  };

  const handleBrandChange = (selectedOption) => {
    setProductData((prev) => ({ ...prev, brand: selectedOption.value }));
  };

  const handleModelChange = (selectedOption) => {
    setProductData((prev) => ({ ...prev, model: selectedOption.value }));
  };

  const handleProductTypeChange = (selectedOption) => {
    setProductData((prev) => ({ ...prev, productType: selectedOption.value }));
  };

  const uploadImages = async () => {
    if (!fileList.length) return [];
    const uploadData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      uploadData.append('images', fileList[i]);
    }
    setImageUploadLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('/api/products/upload', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });
      return res.data.images;
    } catch (error) {
      console.error('Error uploading images:', error.response?.data || error.message);
      toast.error('Image upload failed');
      return [];
    } finally {
      setImageUploadLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');

    const finalCategory = isNewCategory ? newCategory : productData.category;
    const finalSubcategory = isNewSubcategory ? newSubcategory : productData.subcategory;
    const finalBrand = isNewBrand ? newBrand : productData.brand;
    const finalModel = isNewModel ? newModel : productData.model;

    const uploadedImages = await uploadImages();
    const payload = {
      uniqueProductId: productData.uniqueProductId,
      name: productData.name,
      model: finalModel,
      brand: finalBrand,
      description: productData.description,
      price: parseFloat(productData.price),
      discount: productData.discount ? parseFloat(productData.discount) : 0,
      stock: parseInt(productData.stock, 10),
      buyingPrice: parseFloat(productData.buyingPrice),
      featured: productData.featured,
      images: uploadedImages,
      category: finalCategory,
      subcategory: finalSubcategory,
      productType: productData.productType,
    };
    try {
      await axios.post('/api/products', payload, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
      toast.success('Product added successfully!');
      setProductData({
        uniqueProductId: '',
        name: '',
        model: '',
        brand: '',
        description: '',
        price: '',
        discount: '',
        stock: '',
        buyingPrice: '',
        featured: false,
        images: [],
        category: '',
        subcategory: '',
        productType: '',
      });
      setFileList([]);
      setIsNewCategory(false);
      setNewCategory('');
      setIsNewSubcategory(false);
      setNewSubcategory('');
      setIsNewBrand(false);
      setNewBrand('');
      setIsNewModel(false);
      setNewModel('');
      navigate('/admin/products');
    } catch (error) {
      console.error('Error adding product:', error.response?.data || error.message);
      toast.error('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product ID */}
        <div className="mb-4">
          <label className="block text-primary mb-1">Product ID (SKU)</label>
          <input
            type="text"
            name="uniqueProductId"
            value={productData.uniqueProductId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Optional: Enter product ID or auto-generate"
          />
        </div>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-primary mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        {/* Model and Brand */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-primary mb-1">Model</label>
            <div className="flex items-center space-x-2">
              <Select
                options={defaultModelOptions}
                onChange={handleModelChange}
                placeholder="Select Model"
                isSearchable
                value={isNewModel ? null : defaultModelOptions.find(opt => opt.value === productData.model)}
              />
              <button type="button" className="border p-2 rounded" onClick={() => setIsNewModel(!isNewModel)}>
                {isNewModel ? 'Select Existing' : 'Add New'}
              </button>
              {isNewModel && (
                <input
                  type="text"
                  value={newModel}
                  onChange={(e) => setNewModel(e.target.value)}
                  placeholder="Enter new model"
                  className="border p-2 rounded flex-grow"
                />
              )}
            </div>
          </div>
          <div>
            <label className="block text-primary mb-1">Brand</label>
            <div className="flex items-center space-x-2">
              <Select
                options={defaultBrandOptions}
                onChange={handleBrandChange}
                placeholder="Select Brand"
                isSearchable
                value={isNewBrand ? null : defaultBrandOptions.find(opt => opt.value === productData.brand)}
              />
              <button type="button" className="border p-2 rounded" onClick={() => setIsNewBrand(!isNewBrand)}>
                {isNewBrand ? 'Select Existing' : 'Add New'}
              </button>
              {isNewBrand && (
                <input
                  type="text"
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  placeholder="Enter new brand"
                  className="border p-2 rounded flex-grow"
                />
              )}
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="mb-4">
          <label className="block text-primary mb-1">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="4"
          ></textarea>
        </div>
        {/* Pricing & Stock */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-primary mb-1">Sale Price ($)</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-primary mb-1">Discount (%)</label>
            <input
              type="number"
              step="0.01"
              name="discount"
              value={productData.discount}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Optional"
            />
          </div>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-primary mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-primary mb-1">Buying Price ($)</label>
            <input
              type="number"
              step="0.01"
              name="buyingPrice"
              value={productData.buyingPrice}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>
        {/* Category */}
        <div className="mb-4">
          <label className="block text-primary mb-1">Category</label>
          <div className="flex items-center space-x-2">
            <Select
              options={defaultCategoryOptions}
              onChange={handleCategoryChange}
              placeholder="Select Category"
              isSearchable
              value={isNewCategory ? null : defaultCategoryOptions.find(opt => opt.value === productData.category)}
            />
            <button type="button" className="border p-2 rounded" onClick={() => setIsNewCategory(!isNewCategory)}>
              {isNewCategory ? 'Select Existing' : 'Add New'}
            </button>
            {isNewCategory && (
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter new category"
                className="border p-2 rounded flex-grow"
              />
            )}
          </div>
        </div>
        {/* Subcategory and Product Type */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-primary mb-1">Subcategory</label>
            <div className="flex items-center space-x-2">
              <Select
                options={defaultSubcategoryOptions}
                onChange={handleSubcategoryChange}
                placeholder="Select Subcategory"
                isSearchable
                value={isNewSubcategory ? null : defaultSubcategoryOptions.find(opt => opt.value === productData.subcategory)}
              />
              <button type="button" className="border p-2 rounded" onClick={() => setIsNewSubcategory(!isNewSubcategory)}>
                {isNewSubcategory ? 'Select Existing' : 'Add New'}
              </button>
              {isNewSubcategory && (
                <input
                  type="text"
                  value={newSubcategory}
                  onChange={(e) => setNewSubcategory(e.target.value)}
                  placeholder="Enter new subcategory"
                  className="border p-2 rounded flex-grow"
                />
              )}
            </div>
          </div>
          <div>
            <label className="block text-primary mb-1">Product Type</label>
            <Select
              options={productTypeOptions}
              onChange={handleProductTypeChange}
              placeholder="Select Product Type"
              isSearchable
              value={productTypeOptions.find(opt => opt.value === productData.productType)}
            />
          </div>
        </div>
        {/* Featured */}
        <div className="mb-4 flex items-center">
          <label className="block text-primary mr-2">Featured</label>
          <input type="checkbox" name="featured" checked={productData.featured} onChange={handleChange} />
        </div>
        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-primary mb-1">Product Images</label>
          <input type="file" multiple accept="image/*" onChange={handleFileChange} className="w-full" />
          <p className="text-sm text-gray-500">Upload images (up to 5).</p>
          {imageUploadLoading && <p>Uploading images...</p>}
        </div>
        <button
          type="submit"
          disabled={loading || imageUploadLoading}
          className="bg-accent text-black py-2 px-4 rounded hover:bg-yellow-600 transition"
        >
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

export default AdminAddProductPage;
