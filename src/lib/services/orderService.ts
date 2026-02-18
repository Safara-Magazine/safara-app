/**
 * Order Service
 * Handles all order API calls to the backend
 */

import axios from "axios";
import { BACKEND_BASE_URL } from "@/auth/lib/backendConfig";

// ============================================================================
// TYPES
// ============================================================================

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface InitializeOrderRequest {
  email: string;
  customerName: string;
  phone: string;
  items: OrderItem[];
}

export interface OrderPaymentData {
  orderId: string;
  reference: string;
  authorizationUrl: string;
  accessCode: string;
  amount: number;
}

export interface InitializeOrderResponse {
  status: string;
  message: string;
  data: OrderPaymentData;
}

// ============================================================================
// INITIALIZE ORDER (PAYMENT)
// ============================================================================

export const initializeOrder = async (
  payload: InitializeOrderRequest
): Promise<OrderPaymentData> => {
  try {
    console.log("[orderService] Initializing order:", payload);
    const response = await axios.post<InitializeOrderResponse>(
      `${BACKEND_BASE_URL}/api/orders/initialize`,
      payload
    );
    console.log("[orderService] Order initialized:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("[orderService] Error initializing order:", error);
    throw error;
  }
};