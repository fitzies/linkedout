import Link from "next/link";
import { FaNetworkWired, FaEnvelope, FaSearch } from "react-icons/fa";
import NavSignIn from "./NavSignIn";
import UserSearchBar from "./UserSearchBar";

const Nav = () => {
  const items = [
    { name: "Jobs", icon: <FaNetworkWired /> },
    { name: "Messages", icon: <FaEnvelope /> },
  ];

  return (
    <div className="w-screen border-b border-gray-700 p-6 flex justify-between">
      <div className="flex gap-4 justify-center-center">
        <div className="bg-gradient px-4 py-1 rounded-xl text-xl font-bold flex items-center">
          Out
        </div>
        <UserSearchBar />
      </div>
      <div className="flex gap-8 items-center">
        {items.map((item: { name: string; icon: any }) => (
          <Link
            href={item.name.toLowerCase()}
            className="text-2xl"
            key={item.name}
          >
            {item.icon}
          </Link>
        ))}
        {/* @ts-ignore */}
        <NavSignIn />
      </div>
    </div>
  );
};

export default Nav;
