import Link from "next/link";
import React from "react";

const shopOwnerInfoLayout = ({ children }) => {
  return (
    <div>
      <div className='container grid grid-cols-12 mt-16'>
        <div className='col-span-4 '>
          <ul className='menu p-4 w-full bg-transparent text-base-content'>
            <p className='text-2xl font-medium mb-6'>Account Settings</p>
            <li>
              <Link
                href='/shopOwner-information'
                className='flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out'>
                Personal Information
              </Link>
            </li>
            <li>
              <Link
                href='/shopOwner-account'
                className='flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out'>
                Account
              </Link>
            </li>
          </ul>
        </div>
        <div className='col-span-8 '>{children}</div>
      </div>
    </div>
  );
};

export default shopOwnerInfoLayout;
