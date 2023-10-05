import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
const NestedLayout = ({ children }) => {
  const router = useRouter();
  return (
    <div className="container md:grid grid-cols-12 md:gap-8 lg:gap-20  my-12   md:my-24 ">
      <div className="md:col-span-5  lg:col-span-4 ">
        <ul className=" w-full bg-transparent text-base-content lg:block md:block flex lg:overflow-hidden md:overflow-hidden overflow-auto flex-none gap-[2px] md:gap-4">
          <li className="">
            <Link
              href="/about"
              className={`flex items-center text-base xl:text-lg  font-medium  py-4 px-[30px]  h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded-xl md:rounded-none md:rounded-t-xl  transition duration-300 ease-in-out border border-slate-300 ${
                router.asPath == "/about"
                  ? "bg-common text-white"
                  : "bg-[#EAEAEA]"
              }`}>
              About Go Velo
            </Link>
          </li>
          <li className="">
            <Link
              href="/giving-back"
              className={`flex items-center text-base xl:text-lg font-medium py-4 px-[30px]  h-12 overflow-hidden border border-slate-300 rounded-xl md:rounded-none text-ellipsis whitespace-nowrap  transition duration-300 ease-in-out ${
                router.asPath == "/giving-back"
                  ? "bg-common  text-white"
                  : "bg-[#EAEAEA]"
              }`}>
              Giving Back
            </Link>
          </li>
          <li className="hover:bg-sky   rounded-bl-lg rounded-br-lg">
            <Link
              href="/contact"
              className={`flex items-center text-base xl:text-lg font-medium  py-4 px-[30px] h-12 overflow-hidden border border-slate-300 rounded-xl md:rounded-none text-ellipsis whitespace-nowrap  transition duration-300 ease-in-out ${
                router.asPath == "/contact"
                  ? "bg-common text-white"
                  : "bg-[#EAEAEA]"
              }`}>
              Contact
            </Link>
          </li>
          <li className="">
            <Link
              href="/terms-and-condition"
              className={`flex items-center text-base xl:text-lg font-medium  py-4 px-[30px] h-12 overflow-hidden border border-slate-300 rounded-xl md:rounded-none text-ellipsis whitespace-nowrap transition duration-300 ease-in-out ${
                router.asPath == "/terms-and-condition"
                  ? "bg-common text-white"
                  : "bg-[#EAEAEA]"
              }`}>
              Terms and conditions
            </Link>
          </li>
          <li className="">
            <Link
              href="/report-bug"
              className={`flex items-center text-base xl:text-lg font-medium  py-4 px-[30px] h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded-xl md:rounded-none transition border border-slate-300 duration-300 ease-in-out  ${
                router.asPath == "/report-bug"
                  ? "bg-common  text-white"
                  : "bg-[#EAEAEA]"
              }`}>
              Report bug or Request feature
            </Link>
          </li>
          <li className="">
            <Link
              href="/privacy-policy"
              className={`flex items-center md:text-lg text-sm font-medium  py-4 px-[30px] h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap border border-slate-300  rounded-xl md:rounded-none md:rounded-b-xl transition duration-300 ease-in-out ${
                router.asPath == "/privacy-policy"
                  ? "bg-common  text-white"
                  : "bg-[#EAEAEA]"
              }`}>
              Privacy and Policy
            </Link>
          </li>
        </ul>
      </div>
      <div className="md:col-span-7 md:mt-0 mt-8 ">{children}</div>
    </div>
  );
};

export default NestedLayout;
