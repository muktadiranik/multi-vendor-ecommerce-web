import React from "react";

const ProductsCard = ({ data }) => {
  const {
    picture,
    name,
    location,
    deadline,
    button,
    map,
    review,
    totalView,
    rating,
  } = data;
  return (
    <div>
      <div className='grid grid-cols-12 mb-4 border p-6'>
        <div className='col-span-2 mr-1 mt-5'>
          <img src={picture} alt='' />
        </div>
        <div className='col-span-7'>
          <p className='text-3xl text-common font-semibold mb-2'>{name}</p>
          <div className='grid grid-cols-12 text-sm w-full '>
            <div className='col-span-4 text-common  w-full'>{location}</div>
            <div className='col-span-4 text-common  w-full'>
              <button>{button}</button>
            </div>
            <div className='col-span-4 '>{map}</div>
          </div>
          <p className='text-sm mt-5 text-[#E80000]'>{deadline}</p>
        </div>
        <div className='col-span-3 ml-1'>
          <div className='flex'>
            <p className='text-xl font-semibold'>Review score</p>
            <p className='border w-10 h-10 ml-1 rounded-lg bg-common text-center text-white font-bold p-1'>
              {rating}
            </p>
          </div>
          <p className='text-sm text-center mb-4 text-[#7F7F7F]'>{totalView}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
