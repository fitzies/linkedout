"use client";

import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const UserSearchBar = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <form className="flex items-center gap-1">
      <input
        className="input"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        // formAction={searchUser}
      />
      <Link
        className="py-1 px-3 font-bold text-white rounded-lg"
        href={`user/${search}`}
      >
        <FaSearch />
      </Link>
    </form>
  );
};

export default UserSearchBar;
