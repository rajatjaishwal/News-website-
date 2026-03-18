import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <div className="py-8 text-white">
            <form className="max-w-3xl mx-auto px-4" onSubmit={handleSearch}>

                <div className="relative flex items-center rounded-2xl border border-slate-700 bg-[#0f172a] shadow-lg focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300">

                    {/* Search Icon */}
                    <span className="pl-4 text-slate-400">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.3-4.3m1.3-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </span>

                    {/* Input */}
                    <input
                        type="text"
                        name="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for news, topics, or sources..."
                        className="w-full py-4 px-3 bg-transparent outline-none text-white placeholder-slate-400 text-sm md:text-base"
                    />

                    {/* Button */}
                    <button
                        type="submit"
                        className="mr-2 rounded-xl bg-[#8b5cf6] px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#7c3aed] shadow-md"
                    >
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Search;