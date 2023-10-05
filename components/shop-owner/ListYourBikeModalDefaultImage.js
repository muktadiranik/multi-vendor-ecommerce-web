import React from "react";

const ListYourBikeModalDefaultImage = ({ item }) => {
  let nameSerial = 1;
  return (
    <div className='relative'>
      <input
        type='radio'
        name={`image${nameSerial++}`}
        className='checkbox checked:checkbox-primary bg-[#6E6E6E]  rounded-full ml-24 mt-4 absolute'
      />
      <label htmlFor=''>
        <img className='w-[129px] h-[112px] z-0' src={item.img} />
      </label>
    </div>
  );
};

export default ListYourBikeModalDefaultImage;
