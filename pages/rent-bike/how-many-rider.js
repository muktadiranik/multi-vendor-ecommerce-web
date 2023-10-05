import React from "react";
import Image from "next/image";
import ridersIcon from "/public/images/riders.png";

const HowManyRider = () => {
  return (
    <div>
      <div className='w-full relative'>
        <label className='label'>
          <span className='label-text text-sm font-medium'>
            How many riders
          </span>
        </label>
        <select className='select w-full rounded-xl text-[#7F7F7F] font-normal placeholder:text-sm pl-12'>
          <option>2 riders</option>
          <option>Homer</option>
          <option>Marge</option>
          <option>Bart</option>
          <option>Lisa</option>
          <option>Maggie</option>
        </select>
        <Image
          className='absolute top-12 h-5 ml-4 left-1 w-5'
          src={ridersIcon}
          alt=''
        />
      </div>
    </div>
  );
};

export default HowManyRider;
