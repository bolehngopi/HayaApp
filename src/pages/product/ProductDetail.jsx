import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../api/apiClient";

export const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/products/${id}`);
        const data = response.data.data
        setProduct(data);
        console.log("response", data);
        setLoading(false);
      } catch (err) {
        setError("Product not found", err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        {/* Product Display */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="flex justify-center items-center bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[600px] object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">{product.description}</p>
              <p className="text-2xl font-semibold text-blue-500 mb-4">
                ${product.price}
              </p>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-10 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Additional Details
          </h2>
          <ul className="space-y-2">
            <li>
              <span className="font-bold">Category:</span> {product.category}
            </li>
            <li>
              <span className="font-bold">Stock:</span> {product.stock}
            </li>
            <li>
              <span className="font-bold">SKU:</span> {product.sku}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Simulated addToCart function
const addToCart = (product) => {
  alert(`${product.name} added to cart!`);
};
