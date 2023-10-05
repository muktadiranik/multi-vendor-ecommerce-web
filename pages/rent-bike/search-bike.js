import React, { useEffect, useState } from "react";
import searchicon from "/public/images/Vector.png";
import calenderIcon from "/public/images/calender.png";
import ridersIcon from "/public/images/riders.png";
import Link from "next/link";
import Image from "next/image";
import TypeOfBike from "./type-of-bike";
import TypeOfEvent from "./type-of-event";
import HowManyRider from "./how-many-rider";

const SearchBike = () => {
  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-11'>
        <form className='card  bg-yellow'>
          <div className='card-body'>
            <div className='form-control'>
              <p className='font-medium text-xl'>Search</p>
              <label className='label'>
                <span className='label-text text-sm font-medium'>Location</span>
              </label>
              <div className='w-full'>
                <div className='relative'>
                  <input
                    type='text'
                    placeholder='Enter Location'
                    className='input w-full  mt-1 pr-3 pl-11 rounded-xl placeholder:text-xs'
                  />
                  <Image
                    className='absolute top-5 h-5 ml-4 left-1 w-5'
                    src={searchicon}
                    alt=''
                  />
                </div>
              </div>
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text  text-sm font-medium'>
                  Date of Travel
                </span>
              </label>
              <div className='w-full'>
                <div className='relative'>
                  <input
                    type='text'
                    placeholder='Enter Date of Travel'
                    className='input w-full  mt-1 pr-3 pl-11 rounded-xl placeholder:text-xs'
                  />
                  <Image
                    className='absolute top-5 h-5 ml-4 left-1 w-5'
                    src={calenderIcon}
                    alt=''
                  />
                </div>
              </div>
            </div>
            <TypeOfBike />
            <TypeOfEvent />
            <HowManyRider />
            <div className='form-control mt-6'>
              <button className='text-white rounded-md py-3.5 bg-common normal-case font-normal'>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBike;
