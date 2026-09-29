import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <div className="p-6">Loading product...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <img src={product.image} alt={product.title} className="max-h-80 mx-auto object-contain" />
      <div>
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-xl font-bold mb-4">${product.price}</p>
        <button
          onClick={() => onAddToCart(product)}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}