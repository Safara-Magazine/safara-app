'use client';

import { useCartStore } from '@/store/cartStore';
import StepIndicator from '@/components/cart/step-indicator';
import CartStep from '@/components/cart/cart-step';
import DeliveryStep from '@/components/cart/delivery-step';
import PaymentStep from '@/components/cart/payment-step';
import CompleteStep from '@/components/cart/completed-step';

import { useEffect, useState } from 'react';
import GlobalLoader from '@/components/global-loader';
import StoreNavigation from '@/components/layout/Header/StoreNavBar';

export default function CartPage() {
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Get current step - but only after hydration
  const currentStep = useCartStore((state) => state.currentStep);

  // Wait for client-side hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Show loading state during hydration
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B59157] mx-auto mb-4"></div>
                   <GlobalLoader />
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CartStep />;
      case 2:
        return <DeliveryStep />;
      case 3:
        return <PaymentStep />;
      case 4:
        return <CompleteStep />;
      default:
        return <CartStep />;
    }
  };

  return (
    <>
    <StoreNavigation />
    <div className="min-h-screen bg-gray-50">
      {/* Step Indicator - Hide on complete step */}
      <div className="mx-auto">
      {currentStep !== 4 && <StepIndicator currentStep={currentStep} />}

      </div>

      {/* Step Content */}
      <main className="pb-12">{renderStep()}</main>
    </div>
    </>
  );
}