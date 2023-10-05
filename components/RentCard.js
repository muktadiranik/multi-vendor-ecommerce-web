import React from "react";

const RentCard = ({ data }) => {
  const { picture, name, location, button, map, totalView, rating } = data;
  return (
    <div>
      <div className='grid grid-cols-12 mb-4 border p-6'>
        <div className='col-span-2 mr-1 mt-5'>
          <img src={picture} alt='' />
        </div>
        <div className='col-span-10 w-full'>
          <p className='text-3xl text-common font-semibold mb-2'>{name}</p>
          <div className='grid grid-cols-12 text-sm w-full '>
            <div className='col-span-7 text-common  w-full'>{location}</div>
            <div className='col-span-2 text-common '>
              <button>{button}</button>
            </div>
            <div className='col-span-3 '>{map}</div>
          </div>
          <div className='flex mt-8'>
            <p className='border w-10 h-10 ml-1 rounded-lg bg-common text-center text-white font-bold p-1'>
              {rating}
            </p>
            <div className='flex-col'>
              <p className='text-xl font-semibold'>Review score</p>
              <p className='text-sm  text-[#7F7F7F]'>{totalView}</p>
            </div>
          </div>
        </div>
        {/* <div className='col-span-3 ml-1'>
                  
            
                </div> */}
      </div>
    </div>
  );
};

export default RentCard;
