import { Search } from "lucide-react";
import React from "react";

const SearchBtn = () => {
  return (
    <form className="flex items-center">
      <input
        type="text"
        placeholder="Search Products"
        className="w-full py-[9px] pl-3 pr-20 border rounded-sm border-primary focus:outline-none"
      />
      <button
        type="submit"
        className="-ml-12 bg-primary px-3 py-[10px] rounded-r-sm cursor-pointer"
      >
        <Search className="text-gray-100" />{" "}
      </button>
    </form>
  );
};

export default SearchBtn;
