
/**
 * Product Query Hooks
 * TanStack Query hooks for product CRUD operations.
 * Auth is handled entirely by the axiosInstance interceptor —
 * no need to manually read tokens or check localStorage here.
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import {
  getAllProducts,
  getProductStats,
  createProduct,
  updateProduct,
  deleteProduct,
  type Product,
  type CreateProductRequest,
  type UpdateProductRequest,
  type ProductStats,
} from "@/lib/services/productService";
import { useAuthStore } from "../../auth/store/useAuthStore";
import { mergeProduct, ProductII } from "@/components/store-components/products";


// ============================================================================
// PRODUCTS QUERY
// Fetches all products. No auth guard needed here since getAllProducts
// is a public-facing endpoint. If it requires auth on your backend,
// the interceptor handles the token automatically.
// ============================================================================

export const useProducts = (): UseQueryResult<Product[]> => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });
};

// ============================================================================
// PRODUCT STATS QUERY
// Admin-only endpoint. Guarded by checking the token from Zustand directly.
// The interceptor still handles attaching it to the request.
// ============================================================================

export const useProductStats = (): UseQueryResult<ProductStats> => {
  // Read token from Zustand — this is the single source of truth.
  // Do NOT use localStorage.getItem('authToken') — that key doesn't exist.
  // Zustand persist saves to 'auth-storage', not 'authToken'.
  const { token } = useAuthStore();

  return useQuery({
    queryKey: ["products", "stats"],
    queryFn: getProductStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    enabled: !!token, // Only fetch when we actually have a token
    retry: false,
  });
};

// ============================================================================
// CREATE PRODUCT MUTATION
// ============================================================================

export const useCreateProduct = (): UseMutationResult<
  Product,
  Error,
  CreateProductRequest
> => {
  const queryClient = useQueryClient();

  return useMutation({
    // No manual auth guard needed — axiosInstance interceptor handles it.
    // If the token is missing, the backend will return 401, which the
    // response interceptor will catch and log the user out automatically.
    mutationFn: (data: CreateProductRequest) => createProduct(data),
    onSuccess: () => {
      // Invalidate and refetch both product list and stats
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", "stats"] });
    },
    onError: (error) => {
      console.error("[useCreateProduct] Mutation error:", error);
    },
  });
};

// ============================================================================
// UPDATE PRODUCT MUTATION
// ============================================================================

export const useUpdateProduct = (): UseMutationResult<
  Product,
  Error,
  { productId: string; payload: UpdateProductRequest }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, payload }) => updateProduct(productId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", "stats"] });
    },
    onError: (error) => {
      console.error("[useUpdateProduct] Mutation error:", error);
    },
  });
};

// ============================================================================
// DELETE PRODUCT MUTATION
// ============================================================================

export const useDeleteProduct = (): UseMutationResult<void, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", "stats"] });
    },
    onError: (error) => {
      console.error("[useDeleteProduct] Mutation error:", error);
    },
  });
};



// to use backend and local products 

export const useMergedProducts = (): UseQueryResult<ProductII[]> => {
  return useQuery({
    queryKey: ["products", "merged"],
    queryFn: async () => {
      const backendProducts = await getAllProducts();
      return backendProducts.map(mergeProduct); // unholy combination of real ids and local stuffs
    },
    staleTime: 1000 * 60 * 5,
    gcTime:    1000 * 60 * 10,
    retry: 1,
  });
};