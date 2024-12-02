import { useState, useEffect } from "react";
import { HiOutlineChevronDown } from "react-icons/hi2";
import { IoChevronDownOutline } from "react-icons/io5";
import apiClient from "../../api/apiClient";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [filters, setFilters] = useState({
    category: null,
    priceMin: null,
    priceMax: null,
    availability: null,
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    links: [],
  });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || null,
    }));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value || null);
  };

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, current_page: page }));
  };

  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams();

      if (sortBy) {
        const [sort, order] = sortBy.split(",").map((str) => str.trim().toLowerCase());
        queryParams.append("sort", sort);
        queryParams.append("order", order);
      }

      if (filters.category) queryParams.append("category", filters.category);
      if (filters.priceMin) queryParams.append("priceMin", filters.priceMin);
      if (filters.priceMax) queryParams.append("priceMax", filters.priceMax);
      if (filters.availability) queryParams.append("availability", filters.availability);

      queryParams.append("per_page", 15);
      queryParams.append("page", pagination.current_page);

      const response = await apiClient.get(`/products?${queryParams.toString()}`);
      const data = response.data.data;

      setProducts(data.data);
      setPagination({
        current_page: data.current_page,
        total_pages: data.last_page,
        links: data.links,
      });
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters, sortBy, pagination.current_page]);

  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Product Collection</h2>
            <p className="mt-4 max-w-md text-gray-500">
              Browse our collection of premium products with advanced filters and sorting.
            </p>
          </header>

          {/* Mobile Filters & Sorting */}
          <div className="mt-8 block lg:hidden">
            <button
              className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            >
              <span className="text-sm font-medium">Filters & Sorting</span>
              <IoChevronDownOutline className={`transition-transform ${mobileFilterOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileFilterOpen && (
              <div className="mt-4 space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
                {/* Sort By */}
                <div>
                  <label htmlFor="SortBy" className="block text-xs font-medium text-gray-700">
                    Sort By
                  </label>
                  <select
                    id="SortBy"
                    value={sortBy || ""}
                    onChange={handleSortChange}
                    className="mt-1 w-full rounded border-gray-300 text-sm"
                  >
                    <option value="">Sort By</option>
                    <option value="name,desc">Title, DESC</option>
                    <option value="name,asc">Title, ASC</option>
                    <option value="price,desc">Price, DESC</option>
                    <option value="price,asc">Price, ASC</option>
                  </select>
                </div>

                {/* Filters */}
                <div>
                  <p className="block text-xs font-medium text-gray-700">Filters</p>
                  {/* Availability Filter */}
                  <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                      <span className="text-sm font-medium">Availability</span>
                      <HiOutlineChevronDown />
                    </summary>
                    <div className="border-t border-gray-200 bg-white">
                      <ul className="space-y-1 p-4">
                        <li>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="availability"
                              className="size-5 rounded border-gray-300"
                              onChange={(e) =>
                                handleFilterChange("availability", e.target.checked ? "in_stock" : null)
                              }
                            />
                            <span className="text-sm font-medium text-gray-700">In Stock</span>
                          </label>
                        </li>
                        <li>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="availability"
                              className="size-5 rounded border-gray-300"
                              onChange={(e) =>
                                handleFilterChange("availability", e.target.checked ? "out_of_stock" : null)
                              }
                            />
                            <span className="text-sm font-medium text-gray-700">Out of Stock</span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </details>
                  {/* Price Filter */}
                  <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                      <span className="text-sm font-medium">Price</span>
                      <HiOutlineChevronDown />
                    </summary>
                    <div className="border-t border-gray-200 bg-white">
                      <div className="p-4">
                        <div className="flex justify-between gap-4">
                          <input
                            type="number"
                            placeholder="Min"
                            className="w-full rounded-md border-gray-300 text-sm"
                            onChange={(e) => handleFilterChange("priceMin", e.target.value)}
                          />
                          <input
                            type="number"
                            placeholder="Max"
                            className="w-full rounded-md border-gray-300 text-sm"
                            onChange={(e) => handleFilterChange("priceMax", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
            <div className="hidden space-y-4 lg:block">
              <div>
                <label htmlFor="SortBy" className="block text-xs font-medium text-gray-700">
                  Sort By
                </label>
                <select
                  id="SortBy"
                  value={sortBy || ""}
                  onChange={handleSortChange}
                  className="mt-1 rounded border-gray-300 text-sm"
                >
                  <option value="">Sort By</option>
                  <option value="name,desc">Title, DESC</option>
                  <option value="name,asc">Title, ASC</option>
                  <option value="price,desc">Price, DESC</option>
                  <option value="price,asc">Price, ASC</option>
                </select>
              </div>

              <div>
                <p className="block text-xs font-medium text-gray-700">Filters</p>
                <div className="mt-1 space-y-2">
                  {/* Availability Filter */}
                  <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                      <span className="text-sm font-medium">Availability</span>
                      <span className="transition group-open:-rotate-180">
                        <HiOutlineChevronDown />
                      </span>
                    </summary>
                    <div className="border-t border-gray-200 bg-white">
                      <ul className="space-y-1 border-t border-gray-200 p-4">
                        <li>
                          <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="availability"
                              id="FilterInStock"
                              className="size-5 rounded border-gray-300"
                              onChange={(e) =>
                                handleFilterChange("availability", e.target.checked ? "in_stock" : null)
                              }
                            />
                            <span className="text-sm font-medium text-gray-700">In Stock</span>
                          </label>
                        </li>
                        <li>
                          <label htmlFor="FilterOutOfStock" className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="availability"
                              id="FilterOutOfStock"
                              className="size-5 rounded border-gray-300"
                              onChange={(e) =>
                                handleFilterChange("availability", e.target.checked ? "out_of_stock" : null)
                              }
                            />
                            <span className="text-sm font-medium text-gray-700">Out of Stock</span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </details>

                  {/* Price Filter */}
                  <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                      <span className="text-sm font-medium">Price</span>
                      <span className="transition group-open:-rotate-180">
                        <HiOutlineChevronDown />
                      </span>
                    </summary>
                    <div className="border-t border-gray-200 bg-white">
                      <div className="border-t border-gray-200 p-4">
                        <div className="flex justify-between gap-4">
                          <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Rp.</span>
                            <input
                              type="number"
                              id="FilterPriceFrom"
                              placeholder="From"
                              className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                              onChange={(e) => handleFilterChange("priceMin", e.target.value)}
                            />
                          </label>
                          <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Rp.</span>
                            <input
                              type="number"
                              id="FilterPriceTo"
                              placeholder="To"
                              className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                              onChange={(e) => handleFilterChange("priceMax", e.target.value)}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.length > 0 ? (
                  products.map((item, index) => (
                    <li key={index}>
                      <a href="#" className="group block overflow-hidden">
                        <img
                          src={item.image_cover || `https://via.placeholder.com/300x200?text=Product+${item.name}`}
                          alt={item.name}
                          className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                        />
                        <div className="relative bg-white pt-3">
                          <h3 className="text-s text-gray-700 group-hover:underline group-hover:underline-offset-4">
                            {item.name}
                          </h3>
                          <p className="mt-2">
                            <span className="tracking-wider text-gray-900">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}</span>
                          </p>
                        </div>
                      </a>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-900">No products found</p>
                )}
              </ul>
            </div>
          </div>
          {/* Pagination */}
          {(products.length > 0) && (
            <div className="mt-6 flex justify-center">
              <nav>
                <ul className="flex gap-2">
                  {pagination.links.map((link, index) => (
                    <li key={index}>
                      <button
                        disabled={!link.url || pagination.current_page === parseInt(link.label)}
                        onClick={() => handlePageChange(new URL(link.url).searchParams.get("page"))}
                        className={`px-4 py-2 border ${link.active
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-200"
                          } rounded`}
                      >
                        {link.label === "&laquo; Previous" ? "Prev" : link.label === "Next &raquo;" ? "Next" : link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
