import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

const Review = ({ data }) => {
  return (
    <div>
      <div className='grid grid-cols-12 w-full'>
        <div className='col-span-1'>
          <Image
            width={500}
            height={500}
            alt=''
            className='w-16 h-16 border rounded-full'
            src={data?.picture}
          />
        </div>
        <div className='col-span-7 flex-col w-full'>
          <div className='flex mb-2'>
            <p className='font-medium'>{data?.name}</p>
            <div className='flex'>
              <AiFillStar className='text-[#FAB803] ml-2 w-4 mt-1'></AiFillStar>
              <AiFillStar className='text-[#FAB803] ml-2 w-4 mt-1'></AiFillStar>
              <AiFillStar className='text-[#FAB803] ml-2 w-4 mt-1'></AiFillStar>
              <AiFillStar className='text-[#FAB803] ml-2 w-4 mt-1'></AiFillStar>
              <BsStarHalf className='text-[#FAB803] ml-2 w-4 mt-1'></BsStarHalf>
            </div>
          </div>
          <p className='text-sm'>
            The bike was fantastic. Super smooth, plenty of power, all the
            style.
          </p>
        </div>
        <div className='col-span-0'></div>
        <div className='col-span-3'>
          <Link href='' className='text-common text-lg'>
            {data?.bikelink}
          </Link>
        </div>
      </div>
      <div className='divider mx-auto mt-1 mb-1'></div>
    </div>
  );
};

export default Review;
