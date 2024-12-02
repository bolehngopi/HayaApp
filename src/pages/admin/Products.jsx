import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import ProductForm from "../../components/ProductForm";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
  });

  useEffect(() => {
    fetchProducts(pagination.currentPage);
  }, [pagination.currentPage]);

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/products?page=${page}`);
      const { data, current_page, last_page, total } = response.data.data;

      if (Array.isArray(data)) {
        setProducts(data); // Ensure products is always set as an array
        setPagination({
          currentPage: current_page,
          lastPage: last_page,
          total,
        });
      } else {
        console.error("Invalid response format", response.data);
        setError("Unexpected data format from server.");
      }
      setError(null);
    } catch (error) {
      console.error("Fetch products error:", error);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await apiClient.delete(`/products/${id}`);
      fetchProducts(pagination.currentPage); // Refresh the list on the current page
    } catch (error) {
      setError("Failed to delete product.");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.lastPage) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {error && <div className="text-red-500">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-white shadow-md rounded">
          <div className="flex justify-between p-4">
            <button
              onClick={handleCreate}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Product
            </button>
            <div>
              Page {pagination.currentPage} of {pagination.lastPage}
            </div>
          </div>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Stock</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Image</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="border p-2">{product.name}</td>
                  <td className="border p-2">{product.price}</td>
                  <td className="border p-2">{product.stock}</td>
                  <td className="border p-2">{product.description}</td>
                  <td className="border p-2">
                    <img
                      src={product.image_cover}
                      alt={product.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                  </td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center p-4">
            <button
              disabled={pagination.currentPage === 1}
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              disabled={pagination.currentPage === pagination.lastPage}
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setShowForm(false);
            fetchProducts(pagination.currentPage); // Refresh the list
          }}
        />
      )}
    </div>
  );
};

export default AdminProducts;
