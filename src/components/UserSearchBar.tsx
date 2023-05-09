"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Loading from "./Loading";

const UserSearchBar = () => {
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const onclick = () => {
    setIsLoading(() => true);
    setTimeout(() => {
      setIsLoading(() => false);
    }, 1000);
  };

  return (
    <div className="flex items-center gap-1">
      <input
        className="input"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        // formAction={searchUser}
      />
      {search.length > 0 ? (
        <div className="font-bold text-white rounded-lg ml-1" onClick={onclick}>
          <Link href={`user/${search}`}>
            {!isLoading ? <FaSearch /> : <Loading />}
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default UserSearchBar;
