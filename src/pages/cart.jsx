import React, { useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

const Cart = ({ cartItems = [], setCartItems }) => {
  // const [promoCode, setPromoCode] = useState("");
  const navigate = useNavigate();

  const updateQuantity = (id,size, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id, size ) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  // Calculate the total price using useMemo
  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  // Handle empty cart view
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <button onClick={() => navigate('/')} className="bg-black text-white font-bold py-2 px-6 rounded-lg">
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>

      {/* Cart Items List */}
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.size}`} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-4">
              <img src={item.cartImages} alt={item.name} className="w-20 h-20 object-cover rounded-md"/>
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">Size: {item.size}</p>
                <p className="text-md font-medium">₹{item.quantity*item.price}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => updateQuantity(item.id, item.size, -1)} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
              <span className="px-4">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.size, 1)} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
              <button onClick={() => removeItem(item.id,item.size)} className=" text-3xl  hover:text-red-700"><MdDelete /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary & Checkout Section */}
      <div className="mt-8 flex flex-col md:flex-row justify-end items-start gap-8">
        {/* Promo Code Input */}
        {/* <div className="w-full md:w-1/2">
          <label className="block mb-2 font-medium">Promo Code</label>
          <div className="flex">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              className="flex-grow border px-4 py-2 rounded-l-md focus:outline-none"
            />
            <button className="bg-gray-800 text-white px-4 rounded-r-md hover:bg-black">Apply</button>
          </div>
        </div> */}
        
        {/* Total Price and Checkout Button */}
        <div className="w-full md:w-auto mt-6 md:mt-0 text-right">
          <div className="text-2xl font-bold">
            <span>Total: </span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
          <p className="text-sm text-gray-500">Taxes and shipping calculated at checkout</p>
          <button className="mt-4 w-full bg-gray-800  hover:bg-black text-white font-bold py-3 px-6 rounded-lg" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;