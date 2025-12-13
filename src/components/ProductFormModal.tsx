'use client';

import { useState, useEffect } from 'react';
import { X, Upload, AlertCircle } from 'lucide-react';
import { type Product, type CreateProductRequest, type UpdateProductRequest } from '@/lib/services/productService';

interface ProductFormModalProps {
  isOpen: boolean;
  isLoading: boolean;
  product?: Product;
  onClose: () => void;
  onSubmit: (data: CreateProductRequest | UpdateProductRequest) => void;
}

export default function ProductFormModal({
  isOpen,
  isLoading,
  product,
  onClose,
  onSubmit,
}: ProductFormModalProps) {
  const [formData, setFormData] = useState<CreateProductRequest>({
    title: '',
    description: '',
    image: '',
    amount: 0,
    quantity: 0,
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        image: product.image,
        amount: product.amount,
        quantity: product.quantity,
      });
      setImagePreview(product.image);
    } else {
      setFormData({
        title: '',
        description: '',
        image: '',
        amount: 0,
        quantity: 0,
      });
      setImagePreview('');
    }
    setError('');
  }, [product, isOpen]);

  const handleCloudinaryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    try {
      setUploading(true);
      setError('');

      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('upload_preset', 'safara_articles');
      formDataUpload.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formDataUpload,
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      const imageUrl = data.secure_url;

      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
      setImagePreview(imageUrl);
    } catch (err) {
      setError(`Upload failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Product title is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Product description is required');
      return;
    }
    if (!formData.image) {
      setError('Product image is required');
      return;
    }
    if (formData.amount <= 0) {
      setError('Product amount must be greater than 0');
      return;
    }
    if (formData.quantity < 0) {
      setError('Product quantity cannot be negative');
      return;
    }

    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
            disabled={isLoading || uploading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] scrollbar-hide">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              {imagePreview ? (
                <div className="mb-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-w-xs h-48 object-cover rounded-lg"
                  />
                </div>
              ) : null}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#B59157] transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCloudinaryUpload}
                  className="hidden"
                  id="image-input"
                  disabled={uploading || isLoading}
                />
                <label htmlFor="image-input" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    {uploading ? 'Uploading...' : 'Drag and drop your image or click to select'}
                  </p>
                </label>
              </div>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Product Title *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Premium T-Shirt"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent"
                disabled={isLoading || uploading}
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your product..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent resize-none"
                disabled={isLoading || uploading}
              />
            </div>

            {/* Amount and Quantity */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₦) *
                </label>
                <input
                  type="number"
                  id="amount"
                  value={formData.amount || ''}
                  onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                  placeholder="29.99"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent"
                  disabled={isLoading || uploading}
                />
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity *
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={formData.quantity || ''}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                  placeholder="100"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent"
                  disabled={isLoading || uploading}
                />
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex gap-3 justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
            disabled={isLoading || uploading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || uploading}
            className="px-4 py-2 bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-lg hover:shadow-lg transition disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : uploading ? 'Uploading...' : product ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </div>
    </div>
  );
}
