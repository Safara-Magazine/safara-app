"use client";

import { ShoppingCart, Truck, CreditCard, CheckCircle } from "lucide-react";

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3 | 4;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { number: 1, label: "Cart", icon: ShoppingCart },
    { number: 2, label: "Delivery", icon: Truck },
    { number: 3, label: "Payment", icon: CreditCard },
    { number: 4, label: "Complete", icon: CheckCircle },
  ];

  return (
    <div className="w-full  bg-white pt-20 sm:pt-25  border-b">
      <div className="max-w-6xl pl-10 mx-auto  py-6">
        <div className="flex items-center  justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            return (
              <div
                key={step.number}
                className="flex items-center flex-1 "
              >
                {/* Step Circle */}
                <div className="flex flex-col justify-end items-center flex-shrink-0 w-max">
                  <div
                    className={`
                      w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all
                      ${
                        isActive
                          ? "bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white"
                          : isCompleted
                            ? "bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white"
                            : "bg-gray-200 text-gray-400"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>

                  <span
                    className={`
                      mt-2 text-[10px] sm:text-xs text-center  font-medium
                      ${isActive || isCompleted ? "text-[#B59157]" : "text-gray-400"}
                    `}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`
                      flex-1 h-0.5 -mt-4  transition-all
                      ${isCompleted ? "bg-gradient-to-r from-[#B59157] to-[#EBB659]" : "bg-gray-200"}
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
