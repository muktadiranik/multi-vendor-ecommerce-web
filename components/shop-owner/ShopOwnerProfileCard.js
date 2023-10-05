import Image from "next/image";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

import location from "/public/images/shop-owner/map-light.png";
const shopOwnerProfileCard = ({ data }) => {
  return (
    <>
      <div>
        <div className=''>
          <div className='grid grid-cols-12 w-full'>
            <div className='col-span-1'></div>
            <div className='col-span-full w-full mb-2 '>
              <div className='grid grid-cols-12  card-side bg-base-100 shadow-xl w-full border p-3'>
                <div className='col-span-2 mr-1 '>
                  <figure>
                    <Image
                      width={300}
                      height={300}
                      className='w-48 h-44'
                      src={data?.picture}
                      alt='Movie'
                    />
                  </figure>
                </div>
                <div className='col-span-5 ml-4'>
                  <p className='font-semibold text-xl'>{data?.name}</p>
                  <p>{data?.title}</p>
                  <p>
                    {data?.Details2}*{data?.Details3}
                  </p>
                  <div className='flex'>
                    <p>{data?.Details5}</p>
                    <button className='bg-green-600 rounded-full text-sm text-white'>
                      Available
                    </button>
                  </div>
                  <div className='flex mt-5 w-full '>
                    <p>
                      <span className='bg-common w-1 p-1 text-xs rounded-xl text-white'>
                        4.8{" "}
                      </span>
                    </p>
                    <AiFillStar className='text-[#FAB803] ml-2 w-3 mt-1'></AiFillStar>
                    <AiFillStar className='text-[#FAB803] ml-2 w-3 mt-1'></AiFillStar>
                    <AiFillStar className='text-[#FAB803] ml-2 w-3 mt-1'></AiFillStar>
                    <AiFillStar className='text-[#FAB803] ml-2 w-3 mt-1'></AiFillStar>
                    <BsStarHalf className='text-[#FAB803] ml-2 w-3 mt-1'></BsStarHalf>
                    <p className='text-gray-400 ml-1 mt-[-3] text-sm'>
                      {"(60)"}
                    </p>
                  </div>
                </div>
                <div className='col-span-2'></div>
                <div className='col-span-3 w-full'>
                  <div className='flex'>
                    <Image className='w-3 mr-2 mb-3' src={location} alt='' />
                    <p className='text-xs text-common'>{data?.place}</p>
                  </div>
                  <p className='mt-5 font-semibold text-2xl'>
                    {data?.price} € / day
                  </p>
                  <p className='text-lg text-[#7F7F7F]'>
                    {data?.week} € / week
                  </p>

                  <div>
                    <label
                      htmlFor='my-drawer-4'
                      className='drawer-button btn bg-common btn-sm mt-2 normal-case font-normal'>
                      Add to cart
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default shopOwnerProfileCard;
