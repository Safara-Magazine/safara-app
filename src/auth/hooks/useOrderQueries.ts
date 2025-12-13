/**
 * Order Query Hooks
 * TanStack Query hooks for order operations
 */

import {
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import {
  initializeOrder,
  type InitializeOrderRequest,
  type OrderPaymentData,
} from "@/lib/services/orderService";

// ============================================================================
// INITIALIZE ORDER MUTATION
// ============================================================================

export const useInitializeOrder = (): UseMutationResult<
  OrderPaymentData,
  Error,
  InitializeOrderRequest
> => {
  return useMutation({
    mutationFn: initializeOrder,
    onSuccess: (data) => {
      console.log("[useInitializeOrder] Order initialized successfully:", data);
      // Redirect to Paystack payment page
      if (data.authorizationUrl) {
        window.location.href = data.authorizationUrl;
      }
    },
    onError: (error) => {
      console.error("[useInitializeOrder] Mutation error:", error);
    },
  });
};
