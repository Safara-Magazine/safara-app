'use client';

import { useCartStore, DeliveryInfo } from '@/store/cartStore';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function DeliveryStep() {
  const {
    deliveryInfo,
    setDeliveryInfo,
    saveDeliveryDetails,
    setSaveDeliveryDetails,
    getSubtotal,
    getDiscount,
    getDeliveryFee,
    getTotal,
    nextStep,
    prevStep,
  } = useCartStore();

  const [formData, setFormData] = useState<DeliveryInfo>({
    fullName: deliveryInfo?.fullName || '',
    email: deliveryInfo?.email || '',
    phone: deliveryInfo?.phone || '',
    streetAddress: deliveryInfo?.streetAddress || '',
    city: deliveryInfo?.city || '',
    country: deliveryInfo?.country || 'Nigeria',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof DeliveryInfo, string>>>({});

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof DeliveryInfo, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = 'Street address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City/State is required';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof DeliveryInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setDeliveryInfo(formData);
      nextStep();
      toast.success('Delivery information saved!');
    } else {
      toast.error('Please fill in all required fields correctly');
    }
  };

  const handleCancel = () => {
    prevStep();
  };

  const subtotal = getSubtotal() - getDiscount();
  const delivery = getDeliveryFee();
  const total = getTotal();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Fields */}
        <div className="bg-white rounded-lg border p-6 space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              <span className="text-red-500">*</span> Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              <span className="text-red-500">*</span> Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="johndoe@email.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              <span className="text-red-500">*</span> Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="08123456789"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Street Address */}
          <div>
            <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">
              <span className="text-red-500">*</span> Street Address
            </label>
            <input
              type="text"
              id="streetAddress"
              placeholder="123, Awolowo street, Ikeja"
              value={formData.streetAddress}
              onChange={(e) => handleChange('streetAddress', e.target.value)}
              className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent ${
                errors.streetAddress ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.streetAddress && (
              <p className="mt-1 text-xs text-red-500">{errors.streetAddress}</p>
            )}
          </div>

          {/* City/State */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              <span className="text-red-500">*</span> City/State
            </label>
            <input
              type="text"
              id="city"
              placeholder="Lagos"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.city && (
              <p className="mt-1 text-xs text-red-500">{errors.city}</p>
            )}
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              <span className="text-red-500">*</span> Country
            </label>
            <input
              type="text"
              id="country"
              placeholder="Nigeria"
              value={formData.country}
              onChange={(e) => handleChange('country', e.target.value)}
              className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent ${
                errors.country ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.country && (
              <p className="mt-1 text-xs text-red-500">{errors.country}</p>
            )}
          </div>

          {/* Save Details Checkbox */}
          <div className="flex items-center gap-2 pt-2">
            <input
  type="checkbox"
  id="saveDetails"
  checked={saveDeliveryDetails}
  onChange={(e) => setSaveDeliveryDetails(e.target.checked)}
  className="w-4 h-4 accent-[#B59157] border-gray-300 rounded focus:ring-[#B59157] checked:bg-[#B59157]"
/>
            <label htmlFor="saveDetails" className="text-sm text-gray-700">
              Save delivery details for later
            </label>
          </div>
        </div>

        {/* Price Summary */}
        <div className="space-y-3 pt-4 border-t">
          <div className="flex justify-between text-gray-700">
            <span>Cart Subtotal</span>
            <span className="font-semibold">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Delivery</span>
            <span className="font-semibold">{formatPrice(delivery)}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold text-gray-900 pt-3 border-t">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 px-6 py-3 border-2 border-[#B59157] text-[#B59157] rounded-md hover:bg-[#B59157] hover:text-white transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-md hover:opacity-90 transition-opacity font-medium"
          >
            Proceed to payment
          </button>
        </div>
      </form>
    </div>
  );
}