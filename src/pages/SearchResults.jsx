import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { products_data } from "../components/productData";
import { FaStar } from "react-icons/fa6";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery();
  const q = (query.get("q") || "").toLowerCase();
  const navigate = useNavigate();

  const results = products_data.filter((p) => {
    return (
      p.title.toLowerCase().includes(q) ||
      (p.type && p.type.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  });

  return (
    <div className="container my-10">
      <h2 className="text-2xl font-bold mb-4">Search results for "{q}"</h2>
      {results.length === 0 ? (
        <p className="text-gray-600">No products found. Try different keywords.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 self-center">
          {results.map((p) => (
            <div key={p.id} className="cursor-pointer" onClick={() => navigate(`/product/${p.id}`)}>
              <img src={p.img} alt={p.title} className="h-[220px] w-[150px] object-cover rounded-md" />
              <h3 className="font-semibold mt-2">{p.title}</h3>
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span>{p.rating}</span>
              </div>
              <p className="text-sm text-gray-600">₹{p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
