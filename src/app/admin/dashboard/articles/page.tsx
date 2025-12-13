'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Loader } from 'lucide-react';
import ArticleFormModal from '@/components/ArticleFormModal';
import {
  useArticles,
  useArticleStats,
  useCreateArticle,
  useUpdateArticle,
  useDeleteArticle,
} from '@/auth/hooks/useArticleQueries';
import { type Article, type CreateArticleRequest, type UpdateArticleRequest } from '@/lib/services/articleService';

export default function ArticlesPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Queries
  const { data: articles = [], isLoading: articlesLoading, error: articlesError } = useArticles();
  const { data: stats, isLoading: statsLoading } = useArticleStats();

  // Mutations
  const { mutate: createArticle, isPending: isCreating } = useCreateArticle();
  const { mutate: updateArticle, isPending: isUpdating } = useUpdateArticle();
  const { mutate: deleteArticleById, isPending: isDeleting } = useDeleteArticle();

  const isLoading = isCreating || isUpdating || isDeleting;

  // Filter articles
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(search.toLowerCase());

    if (filterStatus === 'published') return matchesSearch && article.published;
    if (filterStatus === 'draft') return matchesSearch && !article.published;
    return matchesSearch;
  });

  const handleOpenForm = (article?: Article) => {
    setSelectedArticle(article || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedArticle(null);
  };

  const handleFormSubmit = (data: CreateArticleRequest | UpdateArticleRequest) => {
    if (selectedArticle) {
      updateArticle(
        { articleId: selectedArticle.id, payload: data as UpdateArticleRequest },
        {
          onSuccess: () => {
            handleCloseForm();
          },
        }
      );
    } else {
      createArticle(data as CreateArticleRequest, {
        onSuccess: () => {
          handleCloseForm();
        },
      });
    }
  };

  const handleDelete = (articleId: string) => {
    if (deleteConfirm === articleId) {
      deleteArticleById(articleId, {
        onSuccess: () => {
          setDeleteConfirm(null);
        },
      });
    } else {
      setDeleteConfirm(articleId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
          <p className="text-gray-600 mt-1">Manage and create articles for your platform</p>
        </div>
        <button
          onClick={() => handleOpenForm()}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#B59157] to-[#EBB659] text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          disabled={isLoading}
        >
          <Plus className="w-5 h-5" />
          New Article
        </button>
      </div>

      {/* Stats Cards */}
      {!statsLoading && stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Total Articles</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Published</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.published}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Drafts</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.draft}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Total Views</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalViews}</p>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search articles by title or content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'published' | 'draft')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B59157] focus:border-transparent"
          >
            <option value="all">All Articles</option>
            <option value="published">Published Only</option>
            <option value="draft">Drafts Only</option>
          </select>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {articlesLoading ? (
          <div className="flex items-center justify-center p-12">
            <Loader className="w-8 h-8 text-[#B59157] animate-spin" />
          </div>
        ) : articlesError ? (
          <div className="p-12 text-center">
            <p className="text-red-600 font-medium">Error loading articles</p>
            <p className="text-gray-600 text-sm mt-1">{articlesError instanceof Error ? articlesError.message : 'Unknown error'}</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-600">
              {articles.length === 0
                ? 'No articles created yet. Start by creating one!'
                : 'No articles match your search criteria.'}
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
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Views
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
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {article.images && article.images.length > 0 && article.images[0]?.url ? (
                        <img
                          src={article.images[0].url}
                          alt={article.images[0].altText || article.title}
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
                        <p className="font-medium text-gray-900">{article.title}</p>
                        <p className="text-sm text-gray-600 truncate">{article.excerpt}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          article.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {article.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {article.views}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => handleOpenForm(article)}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition disabled:opacity-50"
                        disabled={isLoading}
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded-lg transition disabled:opacity-50 ${
                          deleteConfirm === article.id
                            ? 'bg-red-200 text-red-700 hover:bg-red-300'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                        disabled={isLoading}
                      >
                        <Trash2 className="w-4 h-4" />
                        {deleteConfirm === article.id ? 'Confirm?' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Article Form Modal */}
      <ArticleFormModal
        isOpen={isFormOpen}
        isLoading={isLoading}
        article={selectedArticle || undefined}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
