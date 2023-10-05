import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

const Rating = ({ value }) => {
  return (
    <>
      {value >= 1 ? (
        <div>
          <AiFillStar className='text-[#FAB803] ml-2 w-3 '></AiFillStar>
        </div>
      ) : value >= 0.5 ? (
        <BsStarHalf className='text-[#FAB803] ml-2 w-3 '></BsStarHalf>
      ) : (
        <></>
      )}
      {value >= 2 ? (
        <AiFillStar className='text-[#FAB803] ml-2 w-3 '></AiFillStar>
      ) : value >= 1.5 ? (
        <BsStarHalf className='text-[#FAB803] ml-2 w-3 '></BsStarHalf>
      ) : (
        <></>
      )}
      {value >= 3 ? (
        <AiFillStar className='text-[#FAB803] ml-2 w-3 '></AiFillStar>
      ) : value >= 2.5 ? (
        <BsStarHalf className='text-[#FAB803] ml-2 w-3 '></BsStarHalf>
      ) : (
        <></>
      )}
      {value >= 4 ? (
        <AiFillStar className='text-[#FAB803] ml-2 w-3 '></AiFillStar>
      ) : value >= 3.5 ? (
        <BsStarHalf className='text-[#FAB803] ml-2 w-3 '></BsStarHalf>
      ) : (
        <></>
      )}
      {value >= 5 ? (
        <AiFillStar className='text-[#FAB803] ml-2 w-3 '></AiFillStar>
      ) : value >= 4.5 ? (
        <BsStarHalf className='text-[#FAB803] ml-2 w-3 '></BsStarHalf>
      ) : (
        <></>
      )}
    </>
  );
};

export default Rating;
