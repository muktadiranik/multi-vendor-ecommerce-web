import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const AccountSettingLayout = ({ children }) => {
  const router = useRouter();

  return (
    <div>
      <div className="container grid grid-cols-12 mt-16">
        <div className="col-span-12 md:col-span-4 ">
          <p className="text-2xl font-medium mb-2 md:mb-6">Edit Profile</p>
          <ul className="menu p-0 md:p-4 w-full bg-transparent text-base-content grid grid-cols-2  ">
            <li className="col-span-1 md:col-span-2">
              <Link
                href="/user-profile/personal-information"
                className={`flex items-center text-sm md:text-lg xl:py-4 xl:px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded-xl  hover:text-gray-900 transition duration-300 ease-in-out ${
                  router.asPath == "/user-profile/personal-information"
                    ? "bg-[#EBF3FF]"
                    : ""
                }`}>
                Personal Information
              </Link>
            </li>
            {/* <li className="col-span-1 md:col-span-2">
              <Link
                href="/user-profile/account"
                className={`flex items-center text-sm md:text-lg xl:py-4 xl:px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded-xl hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out ${
                  router.asPath == "/user-profile/account" ? "bg-[#EBF3FF]" : ""
                }`}>
                Account
              </Link>
            </li> */}
          </ul>
        </div>
        <div className="col-span-12 md:col-span-8 ">{children}</div>
      </div>
    </div>
  );
};

export default AccountSettingLayout;
