import React from "react";
import { MdLogout } from "react-icons/md";
import { deleteSession } from "../app/actions"

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between bg-blue-500 p-3">
      <div className="flex items-center flex-shrink-0 text-white">
        <a href="/">
          <span className="font-semibold text-xl tracking-tight">
            Product List
          </span>
        </a>
      </div>
      <form action={deleteSession} className="flex items-center">
        <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white">
          Logout
          <MdLogout className="inline-block ml-2" />
        </button>
      </form>
    </nav>
  );
};

export default NavBar;
