/**
 * Product Query Hooks
 * TanStack Query hooks for product CRUD operations
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

// ============================================================================
// PRODUCTS QUERY
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
// ============================================================================

export const useProductStats = (): UseQueryResult<ProductStats> => {
  return useQuery({
    queryKey: ["products", "stats"],
    queryFn: getProductStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
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
    mutationFn: createProduct,
    onSuccess: () => {
      // Refetch products and stats
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
    mutationFn: ({ productId, payload }) =>
      updateProduct(productId, payload),
    onSuccess: () => {
      // Refetch products and stats
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

export const useDeleteProduct = (): UseMutationResult<
  void,
  Error,
  string
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      // Refetch products and stats
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", "stats"] });
    },
    onError: (error) => {
      console.error("[useDeleteProduct] Mutation error:", error);
    },
  });
};
