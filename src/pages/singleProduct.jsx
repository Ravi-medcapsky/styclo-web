import React, { useState } from "react";
import ProductImg from "../components/product_img";
import { products_data } from "../components/productData";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import RatingModal from "../components/RatingModal";

function ProductPage({ onAddToCart }) {
  const { id } = useParams();
  const initialProduct = products_data.find((p) => p.id === id);
  const navigate = useNavigate();

  const [product, setProduct] = useState(initialProduct);
  const [isadded, setIsadded] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product ? product.sizes[0] : '');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Event Handlers ---
  const handleAddToCartClick = () => {
    onAddToCart(product, isadded, selectedSize);
    navigate("/cart");
  };

  const handleReviewSubmit = (newReview) => {
    // In a real app, you'd send this to a backend.
    // For now, we'll just update the local state to show the new review.
    console.log("New review submitted:", newReview);
    const updatedProduct = {
      ...product,
      reviews: [newReview, ...product.reviews],
    };
    setProduct(updatedProduct);
    // Note: This won't persist across page reloads as it's just in-memory state.
  };

  const handleBuyNow = () => {
    // 1. Create a new item object, just for this purchase
    const itemToBuy = {
      id: product.id,
      name: product.title, // Ensure this property name is consistent
      price: product.price,
      quantity: isadded,
      size: selectedSize,
      cartImages: product.img,
    };

    // 2. Navigate to checkout and pass the item in the 'state' object
    navigate('/checkout', { state: { itemsToCheckout: [itemToBuy] } });
  };

  if (!product) {
    return <div className="p-10 text-center text-2xl font-bold">Product not found!</div>;
  }

  // Helper to render stars from a number
  const renderStars = (starCount) => {
    // Ensure starCount is a number
    const count = typeof starCount === 'number' ? starCount : 0;
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} color={i < count ? "#ffc107" : "#e4e5e9"} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col  justify-between gap-10 ">
      <div className="flex flex-col md:flex-row justify-between md:gap-10  m-2 md:mx-10">
        <h2 className="md:hidden font-semibold text-4xl self-center mb-5">{product.title}</h2>


        <div className="hidden md:block w-[50%]">
          <ProductImg img={product.img} images={product.images} />
        </div>

        {/* Smaller screen  */}
        <div className="md:hidden mx-2">
          <ProductImg img={product.img} images={product.images} />
        </div>

        <div className="flex flex-col  gap-1 ">

          {/* hidden in smaaler screen */}
          <h2 className="hidden md:block font-semibold text-4xl self-center mb-5">{product.title}</h2>

          <p className="text-xl mb-5 md:pl-5">{product.description}</p>
          <h3 className="font-semibold text-2xl">Price:</h3><p className="pl-5 mb-5 text-xl font-semibold ">₹{product.price} <span className=" mb-5 text-sm font-semibold text-gray-500 line-through ">₹{product.oldPrice}</span></p>
          <h3 className="font-semibold text-2xl">Available Sizes:</h3>

          {/* Sizes button */}
          <div className="flex gap-4 items-center justify-start pl-5">
            {product.sizes.map(size => (
              <button
                key={size}
                className={`px-5 py-3 rounded-2xl border-1 transition-all duration-300 
                  ${selectedSize === size ? 'bg-gradient-to-br from-[#2c0e5c] to-[#391667] text-white' : 'bg-white text-black hover:bg-gradient-to-br from-[#3f2070] to-[#450d8d] hover:text-white'}`}
                onClick={() => setSelectedSize(size)}
                type="button"
              >
                {size}
              </button>
            ))}
          </div>

          {/* Quantity  */}
          <div>
            <h3 className="font-semibold text-2xl my-5">Quantity</h3>
            <div className="flex items-center justify-center md:justify-start gap-5 pl-5">
              <button className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-300" onClick={() => setIsadded(isadded > 1 ? isadded - 1 : 1)}>-</button>
              <span className="text-xl">{isadded}</span>
              <button className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-300" onClick={() => setIsadded(isadded + 1)}>+</button>
            </div>
          </div>

          {/* Buy Now button */}
          <button className="w-full mt-5 px-6 py-3 bg-gradient-to-br from-[#2c0e5c] to-[#391667] md:w-[35%] text-white rounded-2xl hover:bg-purple-500 self-center active:scale-[0.98] active:duration-75 transition-all duration-300"
            // onClick={() => navigate("/cart")}>
            onClick={handleAddToCartClick}>
            Add to Cart
          </button>

          {/* Add to cart button */}
          <button className="w-full mt-5 px-6 py-3 bg-gradient-to-br from-[#2c0e5c] to-[#391667] md:w-[35%] text-white rounded-2xl hover:bg-[#3f2070] active:scale-[0.98] active:duration-75 transition-all self-center duration-300"
            onClick={handleBuyNow}>
            {isadded === 1 ? "Buy Now" : `Buy ${isadded} Now`}
          </button>

        </div>
      </div >


      {/* Customer Reviews  */}
      <div className="flex flex-col w-[95%] self-center justify-between gap-4 md:px-10">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-3xl">Customer Reviews</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-br from-[#2c0e5c] to-[#391667] text-white py-2 px-4 rounded-full hover:scale-105 duration-200"
          >
            Rate Product
          </button>
        </div>

        <div className="flex flex-col gap-5 ">
          {product.reviews.map((r, index) => (
            <div key={index} className="flex flex-col bg-gray-100 p-4 my-1 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <img
                  src={r.img}
                  alt={r.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h2 className="font-semibold">{r.name}</h2>
                  {renderStars(r.stars)}
                </div>
              </div>
              <p className="text-gray-700">{r.review}</p>
            </div>
          ))}
        </div>
      </div>
      <RatingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );


}

export default ProductPage;