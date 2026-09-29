import React, { useState, useEffect } from 'react';



const MainContainer = ({ onSelectProduct, onAddToCart }) => {



  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("all");
const [maxPrice, setMaxPrice] = useState(1000);






const filteredProducts = products.filter((product) => {
  const categoryMatch =
    selectedCategory === "all" ||
    product.category === selectedCategory;

  const priceMatch = Number(product.price) <= maxPrice;

  return categoryMatch && priceMatch;
});
 


  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://fakestoreapi.com/products');

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  


  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  




        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm animate-pulse flex flex-col justify-between"
            >
              <div>
                <div className="w-full h-48 bg-slate-200 rounded-xl mb-4" />
                <div className="h-4 bg-slate-200 rounded w-1/3 mb-2" />
                <div className="h-5 bg-slate-200 rounded w-3/4 mb-4" />
              </div>

              <div>
                <div className="h-6 bg-slate-200 rounded w-1/4 mb-4" />
                <div className="h-10 bg-slate-200 rounded-xl w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-rose-50 border border-rose-100 rounded-2xl text-center">
        <div className="text-4xl mb-3">⚠️</div>

        <h3 className="text-lg font-bold text-slate-800 mb-1">
          Failed to Load Products
        </h3>

        <p className="text-sm text-slate-600 mb-6">
          {error}
        </p>

        <button
          onClick={fetchProducts}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-rose-600 text-white font-medium rounded-xl hover:bg-rose-700 transition-colors shadow-sm"
        >
          <div className="text-lg">🔄</div>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

     

     {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Explore Products
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Showing {products.length} items
          </p>
        </div>
      </div>

 


 {/* Filters */}
 <div className="flex flex-wrap gap-4 mb-8">

 
  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="border rounded-lg px-4 py-2"
  >
    <option value="all">All Categories</option>

    <option value="men's clothing">
      Men's Clothing
    </option>

    <option value="women's clothing">
      Women's Clothing
    </option>

    <option value="jewelery">
      Jewelery
    </option>

    <option value="electronics">
      Electronics
    </option>
  </select>


  <select
    value={maxPrice}
    onChange={(e) => setMaxPrice(Number(e.target.value))}
    className="border rounded-lg px-4 py-2"
  >
    <option value="1000">All Prices</option>
    <option value="50">Under $50</option>
    <option value="100">Under $100</option>
    <option value="200">Under $200</option>
  </select>

</div>


   





   {/* Product Grid */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
          >

     
            <div className="p-4 relative">

              <span className="inline-block px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 rounded-full mb-3">
                {product.category}
              </span>

         


              <div className="w-full h-48 flex items-center justify-center p-2 overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

            </div>

            <div className="p-4 pt-0 flex-1 flex flex-col justify-between">

              <div>

             
                <h3
                  onClick={() => onSelectProduct?.(product)}
                  className="font-medium text-slate-800 line-clamp-2 hover:text-indigo-600 cursor-pointer transition-colors text-sm h-10 mb-2"
                  title={product.title}
                >
                  {product.title}
                </h3>

                
                <div className="flex items-center gap-1.5 mb-3">

                  <div className="flex items-center text-amber-400">
                    <div className="text-amber-400">⭐</div>
                  </div>

                  <span className="text-xs font-semibold text-slate-700">
                    {product.rating?.rate}
                  </span>

                  <span className="text-xs text-slate-400">
                    ({product.rating?.count})
                  </span>

                </div>

              </div>

            
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">

                <div>
                  <span className="text-xs text-slate-400 block">
                    Price
                  </span>

                  <span className="text-lg font-bold text-slate-900">
                    ${Number(product.price).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => onAddToCart?.(product)}
                  className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 text-white rounded-xl hover:bg-indigo-600 transition-colors shadow-sm active:scale-95"
                  title="Add to Cart"
                >
                  <div>🛒</div>

                  <span className="text-xs font-semibold">
                    Add
                  </span>
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>






    </section>
  );
};

export default MainContainer;