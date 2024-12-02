import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import { useAuth } from '../../context/useAuth';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const history = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q) {
      setQuery(q);
      console.log(user);
      // Perform search logic here, for now we'll just log the query
      console.log(q);
      // Example: setResults(await fetchResults(q));
    }
  }, [location.search]);

  const handleSearch = async (e) => {
    e.preventDefault();
    history(`/search?q=${encodeURI(query)}`, { replace: true });

    try {
      const response = await apiClient(`/search?query=${encodeURI(query)}`);
      setResults(response.data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Search Page</h1>
      <form onSubmit={handleSearch} className="w-full max-w-md">
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            type="text"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          >
            Search
          </button>
        </div>
      </form>
      <div className="mt-8 w-full max-w-md">
        {results.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {results.map((product, index) => (
              <a href={`/product/${product.id}`} className="group block" key={index}>
                <img
                  src={product.image_cover ? product.image_cover : `https://via.placeholder.com/300x200?text=Product+${product.name}`}
                  alt={`Product ${product.name}`}
                  className="aspect-square w-full rounded object-cover"
                />
                <div className="mt-3">
                  <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-700">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}</p>
                </div>
              </a>
            ))}
          </div>

        ) : (
          <p className="text-gray-500">No results found</p>
        )}
      </div>
    </div>
  );
};

export default Search;