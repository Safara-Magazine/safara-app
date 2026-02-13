'use client';

import { ShoppingCart, Truck, CreditCard, CheckCircle } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3 | 4;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { number: 1, label: 'Cart', icon: ShoppingCart },
    { number: 2, label: 'Delivery', icon: Truck },
    { number: 3, label: 'Payment', icon: CreditCard },
    { number: 4, label: 'Complete', icon: CheckCircle },
  ];

  return (
    <div className="w-full bg-white pt-25 border-b">
      <div className="max-w-6xl  mx-auto px-4 py-6">
        <div className="flex items-center  justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            return (
              <div key={step.number} className="flex items-center ">
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center transition-all
                      ${
                        isActive
                          ? 'bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white'
                          : isCompleted
                          ? 'bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white'
                          : 'bg-gray-200 text-gray-400'
                      }
                    `}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`
                      mt-2 text-xs font-medium
                      ${isActive || isCompleted ? 'text-[#B59157]' : 'text-gray-400'}
                    `}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`
                       h-0.5 md:w-60 w-10  -mt-4 md:ml-8 ml-2 transition-all
                      ${isCompleted ? 'bg-gradient-to-r from-[#B59157] to-[#EBB659]' : 'bg-gray-200'}
                    `}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}