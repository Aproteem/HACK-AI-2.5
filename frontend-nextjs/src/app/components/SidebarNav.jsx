"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";
import { useUserContext } from '../UserContext';

const links = [
  { name: "home", path: "/" },
  { name: "chatbot", path: "/chatbot" },
  { name: "Documentation", path: "/documentation" },
  { name: "About Us", path: "/about" },
];

const SidebarNav = () => {
  const { login, setLogin, setChatbot } = useUserContext();

  const handleClick = () => {
    setChatbot(false);
  };
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const logout = () => setLogin(false);

  if (!login) return null;

  return (
    <aside 
      className="fixed top-0 left-0 h-screen z-50 bg-zinc-900 text-white flex flex-col items-center p-4 transition-all duration-300 ease-in-out"
      style={{ 
        width: isExpanded ? "200px" : "60px",
        transform: "translateX(0)" // Ensure it's always visible
      }}
    >
      <button onClick={toggleSidebar} className="text-white mb-6 text-2xl ">
        <FaBars />
      </button>

      <nav className="flex flex-col gap-4 items-start w-full">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.path}
            onClick={handleClick}
            className={`w-full px-4 py-2 capitalize transition-all font-bold hover:opacity-70 ${
              pathname === link.path ? "bg-[#001219]" : ""
            } ${!isExpanded ? "hidden" : ""}`}
          >
            {link.name}
          </Link>
        ))}

        {isExpanded && (
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 mt-4 rounded bg-red-600 hover:bg-red-700 transition"
          >
            Logout
          </button>
        )}
      </nav>
    </aside>
  );
};

export default SidebarNav;