"use client";

import React, { useState } from "react";
import { SearchResults } from "../../../types/types";

const SearchPosts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (!response.ok) {
        throw new Error("検索に失敗しました");
      }

      const data: { results: SearchResults[] } = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error("検索エラー:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[75px] w-full max-w-lg mx-auto mt-5 mb-10">
      <div className="flex items-center space-x-2 my-5">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="投稿を調べる"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-white border-2 border-indigo-900 text-indigo-900 rounded-full px-8 py-2 text-base shadow-[0_5px_0_#191970] inline-block transition-all duration-300 no-underline active:translate-y-1 active:shadow-none"
        >
          ▶
        </button>
      </div>

      {loading && <p className="mt-2 text-gray-600">Searching...</p>}

      <ul className="mt-4 space-y-2">
        {searchResults.map((post) => (
          <li key={post.id} className="p-2 border rounded">
            投稿ID: {post.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPosts;
