import React from "react";

function Navbar() {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500"> &lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </div>
        <a
          href="https://github.com/CrazyArpan"
          target="_blank"
          rel="noopener noreferrer"
          className="button-link"
        >
          <button className="text-white bg-blue-800 my-5 mx-2 rounded-full flex justify-between items-center ring-white ring-1">
            <img className="invert p-1 w-10" src="github.png" alt="" />
            <span className="font-bold px-2">GitHub</span>
          </button>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
