import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

const CustomRating = ({ value }) => {
  return value > 0 ? (
    value == 0.5 || value < 1 ? (
      <div className='flex items-center gap-2 mx-2'>
        <BsStarHalf className='text-[#FAB803] w-3 '></BsStarHalf>
        <AiFillStar className='text-gray-deep w-3 ' />
        <AiFillStar className='text-gray-deep w-3 ' />
        <AiFillStar className='text-gray-deep w-3 ' />
        <AiFillStar className='text-gray-deep w-3 ' />
      </div>
    ) : value == 1 || value < 1.5 ? (
      <div className='flex items-center gap-2 mx-2'>
        <AiFillStar className='text-[#FAB803] w-3 '></AiFillStar>
        <BsStarHalf className='text-[#FAB803] w-3 '></BsStarHalf>
        <AiFillStar className='text-gray-deep w-3 ' />
        <AiFillStar className='text-gray-deep w-3 ' />
        <AiFillStar className='text-gray-deep w-3 ' />
      </div>
    ) : value == 2 || value < 2.5 ? (
      <div className='flex items-center gap-2 mx-2'>
        <AiFillStar className='text-[#FAB803] w-3 '></AiFillStar>
        <AiFillStar className='text-[#FAB803] w-3 '></AiFillStar>
        <AiFillStar className='text-gray-deep w-3 ' />
        <AiFillStar className='text-gray-deep w-3 ' />
        <AiFillStar className='text-gray-deep w-3 ' />
      </div>
    ) : value == 2.5 || value < 3 ? (
      <div className='flex items-center gap-2 mx-2'>
        <AiFillStar className='text-[#FAB803] w-3 '></AiFillStar>
        <AiFillStar className='text-[#FAB803] w-3 '></AiFillStar>
        <BsStarHalf className='text-[#FAB803] w-3 '></BsStarHalf>
        <AiFillStar className='text-gray-deep w-3 ' />
        <AiFillStar className='text-gray-deep w-3 ' />
      </div>
    ) : value == 3 || value < 3.5 ? (
      <div className='flex items-center gap-2 mx-2'>
        <AiFillStar className='text-[#FAB803] w-3 '></AiFillStar>
        <AiFillStar className='text-[#FAB803] w-3 '></AiFillStar>
        <AiFillStar className='text-[#FAB803] w-3 '></AiFillStar>
        <AiFillStar className='text-gray-deep w-3 ' />
        <AiFillStar className='text-gray-deep w-3 ' />
      </div>
    ) : value == 3.5 || value < 4 ? (
      <div className='flex items-center gap-2 mx-2'>
        <AiFillStar className='text-[#FAB803] w-3 '></AiFillStar>
        <AiFillStar className='text-[#FAB803] w-3 '></AiFillStar>
        <AiFillStar className='text-[#FAB803] w-3 '></AiFillStar>
        <BsStarHalf className='text-[#FAB803] w-3 '></BsStarHalf>
        <AiFillStar className='text-gray-deep w-3 ' />
      </div>
    ) : value == 4 || value < 4.5 ? (
      <div className='flex items-center gap-2 mx-2'>
        <AiFillStar className='text-[#FAB803] w-3 '></AiFillStar>
        <AiFillStar className='text-[#FAB803] w-3 '></AiFillStar>
        <AiFillStar className='text-[#FAB803] w-3 '></AiFillStar>
        <AiFillStar className='text-[#FAB803] w-3 '></AiFillStar>
        <AiFillStar className='text-gray-deep w-3 ' />
      </div>
    ) : value == 4.5 || value < 5 ? (
      <div className='flex items-center gap-2 mx-2'>
        <AiFillStar className='text-[#FAB803] w-3 '></AiFillStar>
        <AiFillStar className='text-[#FAB803] w-3 '></AiFillStar>
        <AiFillStar className='text-[#FAB803] w-3 '></AiFillStar>
        <AiFillStar className='text-[#FAB803] w-3 '></AiFillStar>
        <BsStarHalf className='text-[#FAB803] w-3 '></BsStarHalf>
      </div>
    ) : (
      <div className='flex items-center gap-2 mx-2'>
        <AiFillStar className='text-[#FAB803] w-3 '></AiFillStar>
        <AiFillStar className='text-[#FAB803] w-3 '></AiFillStar>
        <AiFillStar className='text-[#FAB803] w-3 '></AiFillStar>
        <AiFillStar className='text-[#FAB803] w-3 '></AiFillStar>
        <AiFillStar className='text-[#FAB803] w-3 '></AiFillStar>
      </div>
    )
  ) : (
    <div className='flex items-center gap-1'>
      <AiFillStar className='text-gray-deep w-3 ml-2' />
      <AiFillStar className='text-gray-deep w-3 ml-2' />
      <AiFillStar className='text-gray-deep w-3 ml-2' />
      <AiFillStar className='text-gray-deep w-3 ml-2' />
      <AiFillStar className='text-gray-deep w-3 ml-2' />
    </div>
  );
};

export default CustomRating;
