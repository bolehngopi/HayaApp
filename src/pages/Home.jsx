import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import apiClient from "../api/apiClient";

export const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await apiClient.get("/products?per_page=8");
      console.log("response", response.data.data.data);
      const data = response.data.data.data;
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (<>
    <div className="bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Welcome to HayaShop.
              <strong className="font-extrabold text-blue-700 sm:block"> I swear it fast. </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Discover the best products at unbeatable prices!
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <NavLink
                className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                to={'products'}
              >
                Get Started
              </NavLink>
            </div>
          </div>
        </div>
      </header>

      {/* New Products */}
      <section className="py-8 px-4">
        <h2 className="text-2xl font-bold text-center mb-6">New Products</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 container mx-auto">
          {products.map((item, index) => (
            /* <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                
                
                className="w-full h-32 object-cover sm:h-40"
              />
              <div className="p-4">
                <h3 className="text-sm font-bold">{item.name}</h3>
                <p className="text-xs text-gray-600">${item.price}</p>
                <Link
                  to={`/product/${item.id}`}
                  className="text-blue-500 text-sm mt-2 block"
                >
                  View Details
                </Link>
              </div>
            </div> */
            (<a href={`/product/${item.id}`} className="group block" key={index}>
              <img
                src={item.image_cover ? item.image_cover : `https://via.placeholder.com/300x200?text=Product+${item.name}`}
                alt={`Product ${item.name}`}
                className="aspect-square w-full rounded object-cover"
              />
              <div className="mt-3">
                <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm text-gray-700">${item.price}</p>
              </div>
            </a>)
          ))}
        </div>
      </section >

      {/* Categories */}
      <section className="bg-gray-100 py-8 px-4" >
        <h2 className="text-2xl font-bold text-center mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 container mx-auto">
          {["Electronics", "Fashion", "Home", "Beauty"].map((category, i) => (
            <NavLink href="#" className="group relative block hover:shadow-2xl transition-all" key={i} to={`categories#${category.toLowerCase()}`}>
              <div className="relative h-[350px] sm:h-[450px]">
                <img
                  src="https://images.unsplash.com/photo-1593795899768-947c4929449d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-100"
                />
              </div>

              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-white">{category}</h3>

                <p className="mt-1.5 text-pretty text-xs text-white">
                  {category.description}
                </p>

                <span
                  className="mt-3 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                >
                  Shop Now
                </span>
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="bg-gray-50">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Join Our Newsletter and Save 10%!
            </h2>

            <p className="hidden text-gray-500 sm:mt-4 sm:block">
              Be the first to know about new arrivals and exclusive offers.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-xl">
            <form action="#" className="sm:flex sm:gap-4">
              <div className="sm:flex-1">
                <label htmlFor="email" className="sr-only">Email</label>

                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-md border-gray-200 bg-white p-3 text-gray-700 shadow-sm transition focus:border-white focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>

              <button
                type="submit"
                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-white transition focus:outline-none focus:ring focus:ring-blue-400 sm:mt-0 sm:w-auto"
              >
                <span className="text-sm font-medium"> Sign Up </span>

                <svg
                  className="size-5 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  </>);
};
