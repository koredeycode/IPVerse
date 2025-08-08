import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-800 text-white p-4">
      <h2 className="text-xl font-bold">IPVerse</h2>
      <nav className="mt-6">
        <a href="/dashboard" className="block py-2 hover:bg-blue-700">
          Dashboard
        </a>
        <a href="/create" className="block py-2 hover:bg-blue-700">
          Create
        </a>
        <a href="/search" className="block py-2 hover:bg-blue-700">
          Explore
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
