import React from "react";

const MobileFilter = ({ isOpen, setIsOpen, children }) => {
  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/10  z-40 md:hidden transition-opacity"
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 shadow-2xl p-5 
          transform transition-transform duration-300 ease-in-out md:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-100px)]">{children}</div>
      </div>
    </>
  );
};

export default MobileFilter;
