import React from "react";
import Products from "./Products";
import Sidebar from "./Sidebar";

const shopOwner = () => {
  return (
    <div className='mb-24'>
      <div className='container grid grid-cols-12 '>
        <div className='col-span-4 mt-8 mb-7 ml-5'>
          <div className='text-sm breadcrumbs'>
            <ul>
              <li className='text-common'>
                <a>Home</a>
              </li>
              <li className='text-common'>
                <a>product</a>
              </li>
              <li className='text-[#7F7F7F]'>Shop owner profile</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-12 container w-full'>
        <div className='col-span-4'>
          <Sidebar></Sidebar>
        </div>
        <div className='col-span-8 mt-8 w-full'>
          <Products></Products>
        </div>
      </div>
    </div>
  );
};

export default shopOwner;
