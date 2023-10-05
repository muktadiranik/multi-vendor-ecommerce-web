import Image from "next/image";
import React from "react";
import calenderIcon from "/public/images/calender.png";
import rightIcon from "/public/images/shop-owner/righticon.png";
const AvailabilityModal = () => {
  return (
    <div className=''>
      <input type='checkbox' id='my-modal' className='modal-toggle' />
      <div className='modal '>
        <div className='modal-box'>
          <label
            htmlFor='my-modal'
            className=' text-2xl p-6 text-common absolute right-2 top-2'>
            ✕
          </label>
          <h3 className='font-medium text-xl  text-center mt-12 '>
            When is your bike available?
          </h3>

          <div className=' flex relative border rounded-lg justify-center  mx-auto gap-4 mt-4'>
            <div className='relative flex-none w-32 '>
              <input
                type='text'
                placeholder='31 December'
                className='  rounded-none input focus:outline-none pr-3 pl-9 placeholder:text-sm ml-[52px]'
              />
              <Image
                className='absolute top-4 h-5  left-12 w-5'
                src={calenderIcon}
                alt=''
              />
            </div>
            <div className='relative flex-none'>
              <input
                type='text'
                placeholder='9 January'
                className='  rounded-none input pr-3 pl-9 mt-[3px] focus:outline-none placeholder:text-sm ml-[52px]'
              />
              <Image
                className='absolute top-4 mt-1  left-12 w-5'
                src={rightIcon}
                alt=''
              />
            </div>
          </div>

          <div className='modal-action'>
            <button className='btn bg-common normal-case font-medium mt-5 text-white hover:bg-transparent hover:text-black mx-auto  '>
              Add another date
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityModal;
