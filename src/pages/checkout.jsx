import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// Define constants for calculation clarity
const SHIPPING_COST = 50.00;
const TAX_RATE = 0.18; // 18% GST

const Checkout = ({ cartItems = [] }) => {
  const navigate = useNavigate();

  // State for form inputs remains the same
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    paymentMethod: 'creditCard',
    // ... other form fields
  });

  // --- DYNAMIC ORDER CALCULATIONS ---
  // The hardcoded orderItems and prices are removed.
  // We use useMemo for performance optimization.
  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const tax = useMemo(() => {
    return subtotal * TAX_RATE;
  }, [subtotal]);

  const total = useMemo(() => {
    return subtotal + SHIPPING_COST + tax;
  }, [subtotal, tax]);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      customerDetails: formData,
      orderItems: cartItems,
      orderSummary: {
        subtotal,
        shipping: SHIPPING_COST,
        tax,
        total
      }
    };
    console.log('Placing order with data:', orderData);
    alert('Order placed successfully! Check the console for the complete order data.');
    // Here you would typically send 'orderData' to your backend API
    // and potentially clear the cart.
  };

  // Handle case where cart is empty and user tries to checkout
  if (cartItems.length === 0) {
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="mb-6">You cannot proceed to checkout without items in your cart.</p>
        <button
          onClick={() => navigate('/cart')}
          className="bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-700"
        >
          Return to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 font-sans">
      <div className="container mx-auto p-4 md:p-10">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="flex flex-col-reverse lg:flex-row lg:space-x-10">

          {/* Left Side: Checkout Form (Your form JSX remains largely the same) */}
          <div className="lg:w-3/5 mt-8 lg:mt-0">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* All your form sections (Shipping, Billing, Payment) go here */}
              {/* Shipping Address Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                      placeholder="Street address, apartment, etc."
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                      placeholder="Enter your city"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <select
                      name="state"
                      id="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                      required
                    >
                      <option value="">Select State</option>
                      <option value="UP">Uttar Pradesh</option>
                      <option value="DL">Delhi</option>
                      <option value="HR">Haryana</option>
                      {/* Add more states as needed */}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                      placeholder="Enter zip code"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <input
                    id="saveInfo"
                    name="saveInfo"
                    type="checkbox"
                    checked={formData.saveInfo}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="saveInfo" className="ml-2 block text-sm text-gray-900">
                    Save this information for next time
                  </label>
                </div>
              </div>

              {/* Billing Address Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
                <div className="flex items-center">
                  <input
                    id="sameAsShipping"
                    name="sameAsShipping"
                    type="checkbox"
                    checked={formData.sameAsShipping}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="sameAsShipping" className="ml-2 block text-sm text-gray-900">
                    Same as shipping address
                  </label>
                </div>
              </div>

              {/* Payment Method Section */}
              <div className='space-y-4'>
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <div className="space-y-1">
                  <label className="flex items-center cursor-pointer p-4 border border-gray-300 rounded-md shadow-sm transition-all duration-200 hover:bg-gray-100">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="creditCard"
                      checked={formData.paymentMethod === 'creditCard'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-900">Credit Card</span>
                  </label>


                </div>
                {/* Credit Card fields conditionally rendered */}
                {formData.paymentMethod === 'creditCard' && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                        placeholder="Enter card number"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                          Expiration Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          id="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          id="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                          placeholder="Enter CVV"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        name="nameOnCard"
                        id="nameOnCard"
                        value={formData.nameOnCard}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                        placeholder="Enter name as it appears on card"
                        required
                      />
                    </div>
                  </div>
                )}
                <div className='space-y-2'>
                  {/* UPI  */}
                  <label className="flex items-center cursor-pointer p-4  border border-gray-300 rounded-md shadow-sm transition-all duration-200 hover:bg-gray-100">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="UPI"
                      checked={formData.paymentMethod === 'UPI'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-900">UPI</span>
                  </label>

                  {formData.paymentMethod === 'UPI' && (
                    <div className="mt-6 space-y-4">
                      <input
                        type="text"
                        name="upiId"
                        id="UPI"
                        value={formData.UPI}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                        placeholder="Enter UPI ID"
                        required
                      />
                    </div>
                  )}


                </div>
                  {/* CASH ON DELIVERY  */}
                  <label className="flex items-center cursor-pointer p-4  border border-gray-300 rounded-md shadow-sm transition-all duration-200 hover:bg-gray-100">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash"
                      checked={formData.paymentMethod === 'Cash'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-900">Cash On Delivery</span>
                  </label>
              </div>

            </form>
          </div>

          {/* Right Side: Order Summary (Now Dynamic) */}
          <div className="lg:w-2/5 p-6 bg-white rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4">
              {/* We now map over the cartItems from props */}
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4"><img
                    src={item.cartImages}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name} (x{item.quantity})</h3>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                    </div>
                  </div>
                  <p className="ml-auto font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                  {/* <div className="flex justify-end items-center ml-auto"> */}
                  {/* </div> */}
                </div>
              ))}
            </div>

            {/* Price breakdown is now dynamic */}
            <div className="mt-6 border-t pt-6">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>₹{SHIPPING_COST.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (18%)</span>
                  <span>₹{tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 border-t border-gray-200 mt-4 pt-4 text-base">
                  <span>Total</span>
                  <span>₹{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="mt-8 w-full bg-gray-900 text-white rounded-md py-3 font-medium hover:bg-gray-700"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;