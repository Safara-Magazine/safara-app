'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Loader } from 'lucide-react';
import ProductFormModal from '@/components/ProductFormModal';
import {
  useProducts,
  useProductStats,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from '@/auth/hooks/useProductQueries';
import { type Product, type CreateProductRequest, type UpdateProductRequest } from '@/lib/services/productService';

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Queries
  const { data: products = [], isLoading: productsLoading, error: productsError } = useProducts();
  const { data: stats, isLoading: statsLoading } = useProductStats();

  // Mutations
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const { mutate: deleteProductById, isPending: isDeleting } = useDeleteProduct();

  const isLoading = isCreating || isUpdating || isDeleting;

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());

    return matchesSearch;
  });

  const handleOpenForm = (product?: Product) => {
    setSelectedProduct(product || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedProduct(null);
  };

  const handleFormSubmit = (data: CreateProductRequest | UpdateProductRequest) => {
    if (selectedProduct) {
      updateProduct(
        { productId: selectedProduct.id, payload: data as UpdateProductRequest },
        {
          onSuccess: () => {
            handleCloseForm();
          },
        }
      );
    } else {
      createProduct(data as CreateProductRequest, {
        onSuccess: () => {
          handleCloseForm();
        },
      });
    }
  };

  const handleDelete = (productId: string) => {
    if (deleteConfirm === productId) {
      deleteProductById(productId, {
        onSuccess: () => {
          setDeleteConfirm(null);
        },
      });
    } else {
      setDeleteConfirm(productId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage and create products for your store</p>
        </div>
        <button
          onClick={() => handleOpenForm()}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          disabled={isLoading}
        >
          <Plus className="w-5 h-5" />
          New Product
        </button>
      </div>

      {/* Stats Cards */}
      {!statsLoading && stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Total Products</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Total Value</p>
            <p className="text-3xl font-bold text-green-600 mt-2">₦{stats.totalValue?.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Low Stock Items</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.lowStock}</p>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search products by title or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {productsLoading ? (
          <div className="flex items-center justify-center p-12">
            <Loader className="w-8 h-8 text-[#B59157] animate-spin" />
          </div>
        ) : productsError ? (
          <div className="p-12 text-center">
            <p className="text-red-600 font-medium">Error loading products</p>
            <p className="text-gray-600 text-sm mt-1">{productsError instanceof Error ? productsError.message : 'Unknown error'}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-600">
              {products.length === 0
                ? 'No products created yet. Start by creating one!'
                : 'No products match your search criteria.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs font-medium">
                          No Image
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{product.title}</p>
                        <p className="text-sm text-gray-600 truncate">{product.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900">
                        ₦{product.amount?.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => handleOpenForm(product)}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition disabled:opacity-50"
                        disabled={isLoading}
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded-lg transition disabled:opacity-50 ${
                          deleteConfirm === product.id
                            ? 'bg-red-200 text-red-700 hover:bg-red-300'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                        disabled={isLoading}
                      >
                        <Trash2 className="w-4 h-4" />
                        {deleteConfirm === product.id ? 'Confirm?' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      <ProductFormModal
        isOpen={isFormOpen}
        isLoading={isLoading}
        product={selectedProduct || undefined}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
