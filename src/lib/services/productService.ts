// /**
//  * Product Service
//  * Handles all product API calls to the backend
//  */

// import axios from "axios";
// import { BACKEND_BASE_URL } from "@/auth/lib/backendConfig";

// // ============================================================================
// // TYPES
// // ============================================================================

// export interface CreateProductRequest {
//   title: string;
//   description: string;
//   image: string;
//   amount: number;
//   quantity: number;
// }

// export interface UpdateProductRequest {
//   title?: string;
//   description?: string;
//   image?: string;
//   amount?: number;
//   quantity?: number;
// }

// export interface Product extends CreateProductRequest {
//   id: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface ProductStats {
//   total: number;
//   totalValue: number;
//   lowStock: number;
// }

// export interface ProductsResponse {
//   status: string;
//   data: {
//     products: Product[];
//     pagination?: {
//       total: number;
//       page: number;
//       limit: number;
//       totalPages: number;
//     };
//   };
// }

// export interface ProductResponse {
//   status: string;
//   message: string;
//   data: Product;
// }

// export interface StatsResponse {
//   status: string;
//   data: ProductStats;
// }

// // ============================================================================
// // PRODUCT STATS
// // ============================================================================

// export const getProductStats = async (): Promise<ProductStats> => {
//   try {
//     console.log("[productService] Fetching product stats");
//     const response = await axios.get<StatsResponse>(
//       `${BACKEND_BASE_URL}/api/products/stats`,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         },
//       }
//     );
//     console.log("[productService] Stats fetched:", response.data.data);
//     return response.data.data;
//   } catch (error) {
//     console.error("[productService] Error fetching stats:", error);
//     throw error;
//   }
// };

// // ============================================================================
// // GET ALL PRODUCTS
// // ============================================================================

// export const getAllProducts = async (): Promise<Product[]> => {
//   try {
//     console.log("[productService] Fetching all products");
//     const response = await axios.get<ProductsResponse>(
//       `${BACKEND_BASE_URL}/api/products`,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         },
//       }
//     );
//     console.log("[productService] Products fetched:", response.data.data.products);
//     return response.data.data.products;
//   } catch (error) {
//     console.error("[productService] Error fetching products:", error);
//     throw error;
//   }
// };

// // ============================================================================
// // GET SINGLE PRODUCT
// // ============================================================================

// export const getProductById = async (productId: string): Promise<Product> => {
//   try {
//     console.log("[productService] Fetching product:", productId);
//     const response = await axios.get<ProductResponse>(
//       `${BACKEND_BASE_URL}/api/products/${productId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         },
//       }
//     );
//     console.log("[productService] Product fetched:", response.data.data);
//     return response.data.data;
//   } catch (error) {
//     console.error("[productService] Error fetching product:", error);
//     throw error;
//   }
// };

// // ============================================================================
// // CREATE PRODUCT
// // ============================================================================

// export const createProduct = async (
//   payload: CreateProductRequest
// ): Promise<Product> => {
//   try {
//     console.log("[productService] Creating product:", payload);
//     const response = await axios.post<ProductResponse>(
//       `${BACKEND_BASE_URL}/api/products`,
//       payload,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         },
//       }
//     );
//     console.log("[productService] Product created:", response.data.data);
//     return response.data.data;
//   } catch (error) {
//     console.error("[productService] Error creating product:", error);
//     throw error;
//   }
// };

// // ============================================================================
// // UPDATE PRODUCT
// // ============================================================================

// export const updateProduct = async (
//   productId: string,
//   payload: UpdateProductRequest
// ): Promise<Product> => {
//   try {
//     console.log("[productService] Updating product:", productId, payload);
//     const response = await axios.patch<ProductResponse>(
//       `${BACKEND_BASE_URL}/api/products/${productId}`,
//       payload,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         },
//       }
//     );
//     console.log("[productService] Product updated:", response.data.data);
//     return response.data.data;
//   } catch (error) {
//     console.error("[productService] Error updating product:", error);
//     throw error;
//   }
// };

// // ============================================================================
// // DELETE PRODUCT
// // ============================================================================

// export const deleteProduct = async (productId: string): Promise<void> => {
//   try {
//     console.log("[productService] Deleting product:", productId);
//     await axios.delete(`${BACKEND_BASE_URL}/api/products/${productId}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//       },
//     });
//     console.log("[productService] Product deleted:", productId);
//   } catch (error) {
//     console.error("[productService] Error deleting product:", error);
//     throw error;
//   }
// };


/**
 * Product Service
 * Handles all product API calls to the backend.
 * Uses the shared axiosInstance which automatically attaches
 * the Bearer token via interceptor — no manual header setup needed.
 */

import axiosInstance from "./axiosInstance";

// ============================================================================
// TYPES
// ============================================================================

export interface CreateProductRequest {
  title: string;
  description: string;
  image: string;
  amount: number;
  quantity: number;
}

export interface UpdateProductRequest {
  title?: string;
  description?: string;
  image?: string;
  amount?: number;
  quantity?: number;
}

export interface Product extends CreateProductRequest {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductStats {
  total: number;
  totalValue: number;
  lowStock: number;
}

export interface ProductsResponse {
  status: string;
  data: {
    products: Product[];
    pagination?: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface ProductResponse {
  status: string;
  message: string;
  data: Product;
}

export interface StatsResponse {
  status: string;
  data: ProductStats;
}

// ============================================================================
// PRODUCT STATS
// ============================================================================

export const getProductStats = async (): Promise<ProductStats> => {
  try {
    console.log("[productService] Fetching product stats");
    const response = await axiosInstance.get<StatsResponse>(
      "/api/products/stats"
    );
    console.log("[productService] Stats fetched:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("[productService] Error fetching stats:", error);
    throw error;
  }
};

// ============================================================================
// GET ALL PRODUCTS
// ============================================================================

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    console.log("[productService] Fetching all products");
    const response = await axiosInstance.get<ProductsResponse>(
      "/api/products"
    );
    console.log(
      "[productService] Products fetched:",
      response.data.data.products
    );
    return response.data.data.products;
  } catch (error) {
    console.error("[productService] Error fetching products:", error);
    throw error;
  }
};

// ============================================================================
// GET SINGLE PRODUCT
// ============================================================================

export const getProductById = async (productId: string): Promise<Product> => {
  try {
    console.log("[productService] Fetching product:", productId);
    const response = await axiosInstance.get<ProductResponse>(
      `/api/products/${productId}`
    );
    console.log("[productService] Product fetched:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("[productService] Error fetching product:", error);
    throw error;
  }
};

// ============================================================================
// CREATE PRODUCT
// ============================================================================

export const createProduct = async (
  payload: CreateProductRequest
): Promise<Product> => {
  try {
    console.log("[productService] Creating product:", payload);
    const response = await axiosInstance.post<ProductResponse>(
      "/api/products",
      payload
    );
    console.log("[productService] Product created:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("[productService] Error creating product:", error);
    throw error;
  }
};

// ============================================================================
// UPDATE PRODUCT
// ============================================================================

export const updateProduct = async (
  productId: string,
  payload: UpdateProductRequest
): Promise<Product> => {
  try {
    console.log("[productService] Updating product:", productId, payload);
    const response = await axiosInstance.patch<ProductResponse>(
      `/api/products/${productId}`,
      payload
    );
    console.log("[productService] Product updated:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("[productService] Error updating product:", error);
    throw error;
  }
};

// ============================================================================
// DELETE PRODUCT
// ============================================================================

export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    console.log("[productService] Deleting product:", productId);
    await axiosInstance.delete(`/api/products/${productId}`);
    console.log("[productService] Product deleted:", productId);
  } catch (error) {
    console.error("[productService] Error deleting product:", error);
    throw error;
  }
};