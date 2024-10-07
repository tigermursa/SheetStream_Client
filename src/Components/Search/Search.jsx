"use client";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { ImSearch } from "react-icons/im";
import BASE_URL from "@/utils/BaseUrl";
const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Use SWR hook
  const { data: results, error } = useSWR(
    searchQuery ? `${BASE_URL}/api/v1/files/search?q=${searchQuery}` : null,
    fetcher,
    { refreshInterval: 0 } // Avoid auto-refreshing
  );

  console.log();

  if (error) {
    console.error("Error fetching search results:", error);
  }

  return (
    <div>
      <div className="flex items-center text-primaryDark font-semibold  gap-1 mb-3 p-2  md:text-sm xl:text-xl">
        <ImSearch />
        <p>Search Blog</p>
      </div>

      <input
        type="text"
        placeholder="Search for blogs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className=" w-full p-2 xl:p-4 rounded-lg focus:outline-none font-sans font-semibold  text-secondaryDark border "
      />
      <ul className="flex flex-col gap-3 text-xs p-2">
        {results?.data?.map((file) => (
          <Link href={`/blogs/${file?._id}`} key={file?._id}>
            <li className="mt-3 cursor-pointer hover:text-blue-400">
              {file.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Search;
