import React from "react";
import FooterTop from "./FooterTop";
import FooterBottom from "./FooterBottom";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="max-w-6xl mx-auto bg-[#F3F4F6] pt-8">
      <FooterTop />
      <FooterBottom />
      <Link className="text-sm py-4 text-gray-800 flex gap-1 justify-center" href={"#"}>
        Design & Developed By
        <span className="text-primary font-semibold"> softriple</span>
      </Link>
    </footer>
  );
};

export default Footer;
