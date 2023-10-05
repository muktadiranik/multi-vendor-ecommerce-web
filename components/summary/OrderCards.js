import Image from "next/image";
import React, { useState } from "react";
import minusIcon from "/public/images/minus.png";
import plusIcon from "/public/images/plus.png";
const OrderCard = ({ data }) => {
  let [quantity, setQuantity] = useState(0);
  const minusBtn = () => {
    quantity = quantity - 1;
    setQuantity(quantity);
  };
  const plusBtn = () => {
    quantity = quantity + 1;
    setQuantity(quantity);
  };
  return (
    <div>
      <div>
        <div>
          <div className=''>
            <div className='grid grid-cols-12 w-full'>
              <div className='col-span-1'></div>
              <div className='col-span-full w-full mb-2'>
                <div className='grid grid-cols-12  card-side bg-base-100 shadow-xl w-full border p-3'>
                  <div className='col-span-4'>
                    <figure>
                      <Image
                        width={500}
                        height={500}
                        className='w-48 h-44'
                        src={data.picture}
                        alt='Movie'
                      />
                    </figure>
                  </div>
                  <div className='col-span-5 grid grid-cols-12 gap-9 ml-4'>
                    <div className='col-span-6'>
                      <p className='font-semibold text-xl'>{data.name}</p>
                      <p className='mt-2'>{data.title}</p>
                      <p className=''>{data.size}</p>
                      <button className='text-sm text-[#7F7F7F] mt-12'>
                        x Remove
                      </button>
                    </div>
                    <div className='col-span-6 '>
                      <p className='text-2xl font-semibold'>
                        {data.price}€ / day
                      </p>
                      <div className='flex gap-2'>
                        <button
                          onClick={minusBtn}
                          className='mt-24 border w-7 h-7'>
                          <Image
                            width={0}
                            height={0}
                            className='mx-auto'
                            src={minusIcon}
                            alt=''
                          />
                        </button>
                        <p className='mt-24 ml-2 text-lg font-semibold'>
                          {quantity}
                        </p>
                        <button
                          onClick={plusBtn}
                          className='mt-24 ml-3 border w-7 h-7 '>
                          <Image
                            width={0}
                            height={0}
                            className='mx-auto'
                            src={plusIcon}
                            alt=''
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
