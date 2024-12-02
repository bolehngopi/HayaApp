import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/apiClient"; // Replace with your actual API client path

export const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/categories"); // Replace with your API endpoint
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              to={`/categories/${category.name.toLowerCase()}`}
              key={category.id}
              className="group relative block rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={category.image || "https://via.placeholder.com/150"}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-25 group-hover:bg-opacity-50 transition" />
              <div className="absolute bottom-0 left-0 p-4">
                <h2 className="text-white text-xl font-semibold">{category.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
