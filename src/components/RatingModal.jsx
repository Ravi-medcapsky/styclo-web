import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const RatingModal = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState('');
  const [reviewText, setReviewText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || !name.trim() || !reviewText.trim()) {
      alert('Please fill out all fields and select a rating.');
      return;
    }
    onSubmit({
      name,
      review: reviewText,
      stars: rating,
      img: `https://i.pravatar.cc/48?u=${name}`, // Placeholder image based on name
    });
    // Reset form and close modal
    setName('');
    setReviewText('');
    setRating(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center transition-opacity duration-300">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md m-4 transform transition-all duration-300 scale-100">
        <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
        <form onSubmit={handleSubmit}>
          {/* Star Rating */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Your Rating</label>
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                      className="hidden"
                    />
                    <FaStar
                      className="cursor-pointer"
                      color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                      size={30}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                    />
                  </label>
                );
              })}
            </div>
          </div>

          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Review Text */}
          <div className="mb-6">
            <label htmlFor="review" className="block text-gray-700 font-medium mb-2">Your Review</label>
            <textarea
              id="review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Write your review here..."
              required
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
            <button type="submit" className="py-2 px-4 bg-gradient-to-br from-[#2c0e5c] to-[#391667] text-white rounded-md hover:opacity-90">Submit Review</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RatingModal;