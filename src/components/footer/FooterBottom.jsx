import {
  Facebook,
  Instagram,
  Linkedin,
  TicketCheckIcon,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FooterBottom = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 justify-around bg-[#DAEDE9] rounded-2xl py-10">
      <div>
        <h4 className="text-xl font-bold text-gray-800 text-center mb-2">
          Follow Us
        </h4>
        <ul className="flex gap-2.5 justify-center">
          <li className="bg-black w-fit p-2 rounded-full text-white hover:bg-white hover:text-black  transition-all duration-500 shadow-md">
            <Link href={"#"}>
              <Facebook />
            </Link>
          </li>
          <li className="bg-black w-fit p-2 rounded-full text-white hover:bg-white hover:text-black  transition-all duration-500 shadow-md">
            <Link href={"#"}>
              <Instagram />
            </Link>
          </li>
          <li className="bg-black w-fit p-2 rounded-full text-white hover:bg-white hover:text-black  transition-all duration-500 shadow-md">
            <Link href={"#"}>
              <Youtube />
            </Link>
          </li>
          <li className="bg-black w-fit p-2 rounded-full text-white hover:bg-white hover:text-black  transition-all duration-500 shadow-md">
            <Link href={"#"}>
              <TicketCheckIcon />
            </Link>
          </li>
          <li className="bg-black w-fit p-2 rounded-full text-white hover:bg-white hover:text-black  transition-all duration-500 shadow-md">
            <Link href={"#"}>
              <Linkedin />
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-xl font-bold text-gray-800 text-center mb-2">
          Call Us Today
        </h4>
        <p className="text-red-400 font-semibold text-xl text-center">
          01339313060
        </p>
      </div>
      <div>
        <h4 className="text-xl font-bold text-gray-800 text-center mb-2">
          Payment Method
        </h4>
        <div className="text-red-400 font-semibold text-xl text-center flex gap-1.5 justify-center items-center">
          <Image src={"/bkash.png"} width={50} height={50} alt="bkash payment" className="bg-white rounded-md" />
          <Image src={"/bkash.png"} width={50} height={50} alt="bkash payment" className="bg-white rounded-md" />
          <Image src={"/bkash.png"} width={50} height={50} alt="bkash payment" className="bg-white rounded-md" />
          <Image src={"/bkash.png"} width={50} height={50} alt="bkash payment" className="bg-white rounded-md" />
          
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
