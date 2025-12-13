'use client';

import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import {
  type Article,
  type CreateArticleRequest,
  type UpdateArticleRequest,
  type ArticleImage,
} from '@/lib/services/articleService';

interface ArticleFormProps {
  isOpen: boolean;
  isLoading: boolean;
  article?: Article;
  onClose: () => void;
  onSubmit: (data: CreateArticleRequest | UpdateArticleRequest) => void;
}

const CATEGORIES = ['TECHNOLOGY', 'LIFESTYLE', 'BUSINESS', 'CULTURE'];

export default function ArticleFormModal({
  isOpen,
  isLoading,
  article,
  onClose,
  onSubmit,
}: ArticleFormProps) {
  const isEditMode = !!article;

  const [formData, setFormData] = useState<CreateArticleRequest>({
    title: article?.title || '',
    content: article?.content || '',
    excerpt: article?.excerpt || '',
    category: article?.category || 'TECHNOLOGY',
    tags: article?.tags || [],
    images: article?.images || [],
  });

  const [tagInput, setTagInput] = useState('');
  const [imageInput, setImageInput] = useState({
    url: '',
    altText: '',
    caption: '',
    order: 0,
  });
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleCloudinaryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('upload_preset', 'safara_articles');

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      
      if (!cloudName) {
        throw new Error('Cloudinary cloud name is not configured. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in your environment variables.');
      }

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formDataUpload,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to upload image');
      }

      const data = await response.json();
      console.log('[ArticleFormModal] Image uploaded:', data.secure_url);

      // Set the uploaded URL
      setImageInput((prev) => ({
        ...prev,
        url: data.secure_url,
      }));
    } catch (error) {
      console.error('[ArticleFormModal] Upload error:', error);
      alert(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploadingImage(false);
      // Reset the input
      e.target.value = '';
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleAddImage = () => {
    if (imageInput.url.trim() && imageInput.altText.trim()) {
      const newImage: ArticleImage = {
        url: imageInput.url.trim(),
        altText: imageInput.altText.trim(),
        caption: imageInput.caption.trim(),
        order: formData.images.length,
      };
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, newImage],
      }));
      setImageInput({
        url: '',
        altText: '',
        caption: '',
        order: 0,
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim() || !formData.excerpt.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 z-50 flex items-center justify-center p-4">
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Edit Article' : 'Create New Article'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
            disabled={isLoading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Article title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent"
              disabled={isLoading}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt *
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="Brief summary of the article"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Full article content"
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent font-mono text-sm"
              required
              disabled={isLoading}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Add a tag and press Enter"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-[#B59157] text-white rounded-lg hover:bg-[#A67E47] transition disabled:opacity-50"
                disabled={isLoading}
              >
                Add
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <div
                    key={tag}
                    className="bg-[#EBB659] text-gray-900 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-gray-700 hover:text-gray-900"
                      disabled={isLoading}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            <div className="space-y-3 mb-3">
              {/* Cloudinary Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#B59157] transition">
                <input
                  type="file"
                  id="cloudinary-upload"
                  accept="image/*"
                  onChange={handleCloudinaryUpload}
                  disabled={isUploadingImage || isLoading}
                  className="hidden"
                />
                <label
                  htmlFor="cloudinary-upload"
                  className={`cursor-pointer ${isUploadingImage ? 'opacity-50' : ''}`}
                >
                  <div className="text-[#B59157] font-semibold mb-2">
                    {isUploadingImage ? 'Uploading...' : 'Click to upload image'}
                  </div>
                  <p className="text-sm text-gray-600">or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                </label>
              </div>

              {/* Alt Text and Caption */}
              {imageInput.url && (
                <>
                  <input
                    type="text"
                    placeholder="Alt text (for accessibility)"
                    value={imageInput.altText}
                    onChange={(e) =>
                      setImageInput((prev) => ({ ...prev, altText: e.target.value }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent"
                    disabled={isLoading}
                  />
                  <input
                    type="text"
                    placeholder="Caption (optional)"
                    value={imageInput.caption}
                    onChange={(e) =>
                      setImageInput((prev) => ({ ...prev, caption: e.target.value }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="w-full px-4 py-2 bg-[#B59157] text-white rounded-lg hover:bg-[#A67E47] transition disabled:opacity-50 flex items-center justify-center gap-2"
                    disabled={!imageInput.altText.trim() || isLoading}
                  >
                    <Plus className="w-4 h-4" />
                    Add Image
                  </button>
                </>
              )}
            </div>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="bg-gray-100 p-3 rounded-lg relative">
                    <img
                      src={image.url}
                      alt={image.altText}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://via.placeholder.com/150?text=Invalid+URL';
                      }}
                    />
                    <p className="text-xs text-gray-600 font-semibold truncate">{image.altText}</p>
                    {image.caption && (
                      <p className="text-xs text-gray-500 truncate">{image.caption}</p>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                      disabled={isLoading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#B59157] text-white rounded-lg hover:bg-[#A67E47] transition disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : isEditMode ? 'Update Article' : 'Create Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
