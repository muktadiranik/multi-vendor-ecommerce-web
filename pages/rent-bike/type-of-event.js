import React from "react";

const TypeOfEvent = () => {
  return (
    <div>
      <div className='w-full'>
        <label className='label'>
          <span className='label-text text-sm font-medium'>
            Type for Events
          </span>
        </label>
        <select className='select w-full rounded-xl text-[#7F7F7F] font-normal placeholder:text-sm'>
          <option>La tour</option>
          <option>Homer</option>
          <option>Marge</option>
          <option>Bart</option>
          <option>Lisa</option>
          <option>Maggie</option>
        </select>
      </div>
    </div>
  );
};

export default TypeOfEvent;
