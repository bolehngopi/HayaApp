import { useState } from "react";
import apiClient from "../../../api/apiClient";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    image_cover: null,
  });
  const [error, setError] = useState(null);

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
      await apiClient.post("/products", data);
      alert("Product created successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Create Product</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
          className="textarea textarea-bordered w-full"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="category_id"
          placeholder="Category ID"
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
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
