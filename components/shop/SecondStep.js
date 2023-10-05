import React from "react";
import dropIcon from "/public/images/drop.png";
import user from "/public/images/user-big.png";
import Image from "next/image";

const SecondStep = () => {
  return (
    <div>
      <p className='mt-8 text-lg font-medium text-left'>
        Write Your Rental Bike Shop General Information.
      </p>
      <form className='mt-4'>
        <div className='border border-gray rounded-xl pt-6 pb-4 px-4'>
          <div className='flex items-center gap-4'>
            <div className=' form-control rounded-[10px] w-full'>
              <label className='label'>
                <span className='font-medium mb-1 '>
                  BrandShop Name<span className='text-common'>*</span>
                </span>
              </label>
              <input
                type='text'
                placeholder='Enter your bike shop name'
                className='input input-bordered placeholder:text-[14px] w-full'
              />
            </div>
            <div className=' form-control rounded-[10px] w-full'>
              <label className='label'>
                <span className='font-medium mb-1 '>
                  Legal Entity<span className='text-common'>*</span>
                </span>
              </label>
              <input
                type='text'
                placeholder='Enter your legan entity name'
                className='input input-bordered placeholder:text-[14px] w-full'
              />
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div className=' form-control rounded-[10px] w-full'>
              <label className='label'>
                <span className='font-medium mb-1 '>
                  Phone Number<span className='text-common'>*</span>
                </span>
              </label>
              <input
                type='number'
                placeholder='Enter your phone number'
                className='input input-bordered placeholder:text-[14px] w-full'
              />
            </div>
            <div className=' form-control rounded-[10px] w-full'>
              <label className='label'>
                <span className='font-medium mb-1 '>Email</span>
              </label>
              <input
                type='email'
                placeholder='Enter your email'
                className='input input-bordered placeholder:text-[14px] w-full'
              />
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div className=' form-control rounded-[10px] w-full'>
              <label className='label'>
                <span className='font-medium mb-1 '>Opening Hours</span>
              </label>
              <input
                type='number'
                placeholder='09:00 am'
                className='input input-bordered placeholder:text-[14px] w-full'
              />
            </div>
            <div className=' form-control rounded-[10px] w-full'>
              <label className='label'>
                <span className='font-medium mb-1 '>Closing Hours</span>
              </label>
              <input
                type='email'
                placeholder='06:00 pm'
                className='input input-bordered placeholder:text-[14px] w-full'
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SecondStep;
