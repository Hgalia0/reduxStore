import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import Cart from "./components/Cart";

import Checkout from "./components/Checkout";
import ProductDetails from "./components/ProductDetails";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const handleAddToCart = (product) => {
    setCartItems((currentItems) => [...currentItems, product]);
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  return (
    <BrowserRouter>
  


      <nav className="flex items-center justify-between p-4 bg-gray-100 border-b border-gray-200">
        <div className="flex gap-6">
          <Link to="/" className="font-semibold text-gray-700 hover:text-black">
            Home
          </Link>
          <Link to="/all-products" className="font-semibold text-gray-700 hover:text-black">
            All Products
          </Link>
          <Link to="/shopping-cart" className="font-semibold text-gray-700 hover:text-black">
            Shopping Cart ({cartItems.length})
          </Link>
          <Link to="/checkout" className="font-semibold text-gray-700 hover:text-black">
            Checkout
          </Link>
        </div>

    


        <button
          onClick={() => setCartOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          🛒 Cart ({cartItems.length})
        </button>
      </nav>




      <Cart
        cartItems={cartItems}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onRemoveFromCart={handleRemoveFromCart}
      />

    
      <main className="p-4">
        <Routes>
       
          <Route
            path="/"
            element={<MainContainer onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/all-products"
            element={<MainContainer onAddToCart={handleAddToCart} />}
          />

          {/* Dynamic route for DetailedCard / Product View */}
          <Route
            path="/product/:id"
            element={<ProductDetails onAddToCart={handleAddToCart} />}
          />

      
          <Route
            path="/shopping-cart"
            element={
              <div className="max-w-4xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>
                {cartItems.length === 0 ? (
                  <p className="text-gray-500">Your cart is currently empty.</p>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center border p-4 rounded shadow-sm"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 object-contain"
                          />
                          <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-gray-600">${item.price}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-red-500 hover:underline text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            }
          />

        
          <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}