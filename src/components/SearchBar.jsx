import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submit = () => {
    const q = query.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="relative group hidden sm:block">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
        placeholder="Search"
        className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-3 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <button
        onClick={submit}
        aria-label="Search"
        className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500"
      >
        <IoMdSearch />
      </button>
    </div>
  );
};

export default SearchBar;
