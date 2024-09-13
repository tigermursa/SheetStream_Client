"use client"
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import useSWR from "swr";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Use SWR hook
  const { data: results, error } = useSWR(
    searchQuery ? `http://localhost:5000/api/v1/files/search?q=${searchQuery}` : null,
    fetcher,
    { refreshInterval: 0 } // Avoid auto-refreshing
  );

  if (error) {
    console.error("Error fetching search results:", error);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search for files..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {results?.data?.map((file) => (
          <li key={file._id}>
            {file.title} {/* Display title */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
