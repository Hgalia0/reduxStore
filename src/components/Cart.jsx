import React from "react";

export default function Cart({
  cartItems,
  isOpen,
  onClose,
  onRemoveFromCart,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
     
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      ></div>

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            🛒 Your Cart
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Empty cart */}
        {cartItems.length === 0 ? (
          <p className="text-gray-500">
            Your cart is empty.
          </p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-sm">
                    {item.title}
                  </h3>

                  <p className="text-gray-500">
                    ${Number(item.price).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => onRemoveFromCart(item.id)}
                  className="text-red-500"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}