import { AtSign, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FooterTop = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center px-8 lg:px-2 gap-5 my-5">
      <Link href={"/"} className="mt-10">
        <Image src="/shop-genius.png" width={180} height={80} alt="Logo" />
      </Link>
      <div className="space-y-3">
        <h2 className="font-semibold text-2xl text-text_primary">Contact Us</h2>
        <p className="flex gap-1.5 text-[16px] items-center text-gray-800">
          <AtSign size={20} className="text-primary font-bold" />{" "}
          arifuzzamanar29@gmail.com{" "}
        </p>
        <p className="flex gap-1.5 text-[16px] items-center text-gray-800">
          <Phone size={20} className="text-primary font-bold" /> 01339313060
        </p>
        <p className="flex gap-1.5 text-[16px] items-center text-gray-800">
          <MapPin size={20} className="text-primary font-bold" /> Dhaka,
          Bangladesh
        </p>
      </div>
      <nav>
        <h2 className="text-[26px] font-bold text-text_primary mb-2.5">
          Quick Links
        </h2>
        <ul className="text-gray-800 space-y-3">
          <li>
            <Link href={"#"}>Return & Refund Policy</Link>
          </li>
          <li>
            <Link href={"#"}>Terms and Conditions</Link>
          </li>
          <li>
            <Link href={"#"}>Privacy Policy</Link>
          </li>
          <li>
            <Link href={"#"}>About us</Link>
          </li>
        </ul>
      </nav>
      <nav>
        <h2 className="text-[26px] font-bold text-text_primary mb-2.5">
          Customer Service
        </h2>
        <ul className="text-gray-800 space-y-3">
          <li>
            <Link href={"#"}>Support Center</Link>
          </li>
          <li>
            <Link href={"#"}>Privacy & Policy</Link>
          </li>
          <li>
            <Link href={"#"}>Terms & Conditions</Link>
          </li>
          
        </ul>
      </nav>
    </div>
  );
};

export default FooterTop;
