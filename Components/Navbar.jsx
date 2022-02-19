import Link from "next/link";
import { useState } from "react";

function Navbar() {
  const [isCollapsed, setCollapsed] = useState(true);

  const tabs = {
    "Home Page": "/",
    Posts: "/posts",
    Authors: "/authors",
  };

  const tabsValues = Object.values(tabs);

  const navContent = Object.keys(tabs).map((tabName, index) => (
    <li key={tabName} className="md:text-gray-200 text-gray-700 md:hover:text-white">
      <Link href={tabsValues[index]}>{tabName}</Link>
    </li>
  ));

  return (
    <div className="md:px-16 px-5 py-4 flex items-center gap-8 bg-blue-800 text-white sticky top-0 z-10">
      <div className="grow md:grow-0">
        <h1 className="font-semibold text-xl font-serif">
          <Link href="/">Event Handler</Link>
        </h1>
      </div>
      <nav className="hidden md:block">
        <ul className="flex gap-5">{navContent}</ul>
      </nav>
      <div onClick={() => setCollapsed(!isCollapsed)} className="md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
      <div
        className={`absolute top-full right-0 left-0 mx-2 rounded-lg shadow-lg transition-all duration-200 bg-white px-5 py-5 ${
          !isCollapsed
            ? "opacity-100"
            : "pointer-events-none -translate-y-5 opacity-0"
        }`}
      >
        <nav>
          <ul className="mobile-menu">{navContent}</ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
