import React from "react";
import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div>
        <HeaderTop />
        <HeaderBottom />
      </div>
    </header>
  );
};

export default Header;
