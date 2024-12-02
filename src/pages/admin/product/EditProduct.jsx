import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../../api/apiClient";

const EditProduct = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    image_cover: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/products/${id}`);
        setFormData(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await apiClient.post(`/products/${id}`, data);
      alert("Product updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="file"
          name="image_cover"
          onChange={handleChange}
          className="file-input file-input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
