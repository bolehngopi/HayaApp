import { useState } from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import { RiArrowGoBackLine } from "react-icons/ri";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { useEffect } from "react";

export const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  let { id } = useParams();

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

  const handleQuantityChange = (type) => {
    setQuantity((prev) =>
      type === "increase"
        ? Math.min(prev + 1, product.stock)
        : prev > 1
          ? prev - 1
          : 1
    );
  };

  const handleAddToCart = async () => {
    try {
      const response = await apiClient.post("/cart", {
        product_id: product.id,
        quantity: quantity,
      });
      console.log(response.data.data);
      alert("Product added to cart!");
      if (confirm("Do you want to view your cart?")) {
        navigate("/cart");
      }
    } catch (error) {
      console.log("Error adding to cart", error);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8 min-h-dvh place-content-center">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="flex-1">
          <img
            src={product.image_cover}
            alt={`Image for product ${product.name}`}
            className="w-full object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600 text-lg">
            {product.description}
          </p>
          <p className="text-2xl font-semibold text-blue-600">${product.price}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Quantity:</span>
            <button
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
              onClick={() => handleQuantityChange("decrease")}
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
              onClick={() => handleQuantityChange("increase")}
            >
              +
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleAddToCart}
            >
              <BsFillCartPlusFill /> Add to Cart
            </button>
          </div>

          {/* Back Button */}
          <NavLink
            to="/"
            className="flex items-center gap-2 mt-4 text-gray-600 hover:text-gray-800"
          >
            <RiArrowGoBackLine /> Back to Home
          </NavLink>
        </div>
      </div>
    </div>
  );
};
