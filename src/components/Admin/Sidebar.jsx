import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-lg font-semibold border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="flex-grow p-4 space-y-2">
        <Link
          to="/admin/products"
          className="block px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          View Products
        </Link>
        <Link
          to="/admin/products/create"
          className="block px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Add Product
        </Link>
        <Link
          to="/admin/products/update"
          className="block px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Edit Product
        </Link>
        <Link
          to="/admin/products/delete"
          className="block px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Delete Product
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
